import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { setMeetupRequest } from '~/store/modules/meetup/actions';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const response = await api.get('meetups');

    const data = response.data.map(meetup => {
      const time = format(parseISO(meetup.date), "d 'de' MMMM, 'às' HH'h'", {
        locale: pt,
      });
      return { time, ...meetup };
    });
    console.log(data[0]);

    setMeetups(data);
  }

  useEffect(() => {
    loadMeetups();
  }, []);

  function viewMeetupDetails(meetup) {
    dispatch(setMeetupRequest(meetup));
  }

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
              <button type="button" onClick={() => viewMeetupDetails(meetup)}>
                <MdChevronRight size={24} color="#FFF" />
              </button>
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
