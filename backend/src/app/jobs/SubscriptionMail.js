import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;
    console.log(data);

    Mail.sendMail({
      to: `${meetup.manager.name} <${meetup.manager.email}>`,
      subject: 'Inscrição confirmada',
      template: 'subscription',
      context: {
        user: user.name,
        title: meetup.title,
        localization: meetup.localization,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às', H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
