import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => {
        const time = format(parseISO(meetup.date), "d 'de' MMMM, 'às' HH'h'", {
          locale: pt,
        });
        return { time, ...meetup };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={() => false}>
          <MdAddCircleOutline size={20} color="#FFF" />
          Novo meetup
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.time}</span>
              <Link to="/meetup">
                <MdChevronRight size={24} color="#FFF" />
              </Link>
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
