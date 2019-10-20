import React from 'react';
import { useSelector } from 'react-redux';
import { MdModeEdit, MdDeleteForever, MdLocationOn } from 'react-icons/md';
import { IoMdCalendar } from 'react-icons/io';

import { Content, Container, BottomContent } from './styles';

export default function MeetupDetails() {
  const { meetup } = useSelector(state => state.meetup);

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <button type="button" onClick={() => false}>
            <MdModeEdit size={20} color="#FFF" />
            Editar
          </button>
          <button type="button" onClick={() => false}>
            <MdDeleteForever size={20} color="#FFF" />
            Cancelar
          </button>
        </div>
      </header>
      <Content>
        <img src={meetup.banner.url} alt={meetup.title} />
        <p>{meetup.description}</p>
      </Content>
      <BottomContent>
        <IoMdCalendar size={20} />
        <p>{meetup.time}</p>
        <MdLocationOn size={20} />
        <p>{meetup.localization}</p>
      </BottomContent>
    </Container>
  );
}
