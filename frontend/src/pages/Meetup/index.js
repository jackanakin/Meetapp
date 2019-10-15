import React, { useState, useEffect } from 'react';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';

import { Container } from './styles';

export default function Meetup() {
  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={() => false}>
          <MdModeEdit size={20} color="#FFF" />
          Editar
        </button>
        <button type="button" onClick={() => false}>
          <MdDeleteForever size={20} color="#FFF" />
          Cancelar
        </button>
      </header>
    </Container>
  );
}
