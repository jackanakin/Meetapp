import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
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
    const meetups = await Meetup.findAll({
      where: {
        manager_id: req.userId,
      },
    });
    return res.json(meetups);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const meetup = await Meetup.findByPk(req.params.id);
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
        error: "You don't have auth to delete this entry",
      });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({ error: 'Meetup had already happen!' });
    }

    await meetup.destroy();

    return res.json({ message: 'Meetup canceled!' });
  }
}

export default new MeetupController();
