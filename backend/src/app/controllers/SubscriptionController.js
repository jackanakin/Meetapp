import { isBefore, subHours, addHours } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'description', 'localization', 'date'],
          where: {
            date: {
              [Op.gte]: new Date(),
            },
          },
        },
      ],
      order: [['meetup', 'date', 'ASC']],
    });
    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [{ model: User, as: 'manager', attributes: ['name', 'email'] }],
    });

    if (meetup.manager_id === req.userId) {
      return res.status(401).json({
        error: 'Você não pode se inscrever em um Meetup que organiza',
      });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({ error: 'Este Meetup já aconteceu' });
    }

    const existentSubscription = await Subscription.findOne({
      where: {
        meetup_id: req.params.id,
        user_id: req.userId,
      },
    });

    if (existentSubscription) {
      return res
        .status(401)
        .json({ error: 'Você já se inscreveu neste Meetup' });
    }

    const dateRangeBefore = subHours(meetup.date, 1);
    const dateRangeAfter = addHours(meetup.date, 1);

    const conflictedSubscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['date'],
          where: {
            date: {
              [Op.between]: [dateRangeBefore, dateRangeAfter],
            },
          },
        },
      ],
    });

    if (conflictedSubscriptions.length > 0) {
      return res.status(401).json({
        error: 'Você já está inscrito em uma Meetapp neste horário!',
      });
    }

    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    });

    await Subscription.create({
      user_id: req.userId,
      meetup_id: req.params.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json({ message: 'Inscricação realizada' });
  }
}

export default new SubscriptionController();
