import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(5),
      description: Yup.string()
        .required()
        .min(8),
      localization: Yup.string()
        .required()
        .min(5),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados de entrada' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Data inválida' });
    }

    req.body.manager_id = req.userId;

    const {
      id,
      title,
      description,
      localization,
      date,
      banner_id,
      manager_id,
    } = await Meetup.create(req.body);

    return res.json({
      id,
      title,
      description,
      localization,
      date,
      banner_id,
      manager_id,
    });
  }

  async index(req, res) {
    const { date, page } = req.query;

    if (!date && !page) {
      const meetups = await Meetup.findAll({
        where: {
          manager_id: req.userId,
        },
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['url', 'id', 'path'],
          },
        ],
      });
      return res.json(meetups);
    }
    if (page === 0) {
      return res.status(400).json({
        error: 'A página 0 não existe',
      });
    }

    const searchDate = parseISO(date);
    const limitPerPage = 10;

    const meetups = await Meetup.findAll({
      limit: limitPerPage,
      offset: (page - 1) * limitPerPage,
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(5),
      description: Yup.string()
        .required()
        .min(8),
      localization: Yup.string()
        .required()
        .min(8),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados de entrada' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Data inválida' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup não encontrada' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Este Meetup já aconteceu, não é possível editá-lo' });
    }

    req.body.manager_id = req.userId;

    const {
      title,
      description,
      localization,
      date,
      banner_id,
    } = await meetup.update(req.body);

    return res.json({ title, description, localization, date, banner_id });
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.manager_id !== req.userId) {
      return res.status(401).json({
        error: 'Você não é o criador deste Meetup',
      });
    }

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Este Meetup já aconteceu, não é possível remove-lo' });
    }

    await meetup.destroy();

    return res.json({ message: 'Meetup cancelado com sucesso' });
  }
}

export default new MeetupController();
