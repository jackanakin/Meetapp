import { isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [{ model: User, as: 'manager', attributes: ['name', 'email'] }],
    });

    if (meetup.manager_id === req.userId) {
      return res.status(401).json({
        error: 'You cannot subscribe to your own event',
      });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({ error: 'Meetup had already happen!' });
    }

    const existentSubscription = await Subscription.findOne({
      where: {
        meetup_id: req.params.id,
        user_id: req.userId,
      },
    });

    if (existentSubscription) {
      return res.status(401).json({ error: 'Meetup already subscribed!' });
    }

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
            date: meetup.date,
          },
        },
      ],
    });

    if (conflictedSubscriptions.length > 0) {
      return res.status(400).json({
        error: 'You already have a Meetup subscribed in the same date!',
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

    return res.json({ message: 'Subscribed!' });
  }
}

export default new SubscriptionController();
