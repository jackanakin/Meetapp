import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      background-color: #f26574;
      color: #fff;
      border-radius: 4px;
      border: 0;
      padding: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 140px;
      text-justify: auto;
      font-weight: bold;
    }
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
`;

export const Meetup = styled.li`
  margin: 0 0 8px 0;
  width: 900px;
  padding: 20px;
  border-radius: 6px;
  background: #23202b;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  strong {
    color: #fff;
    font-size: 17px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    span {
      margin-right: 15px;
      color: #666;
    }

    a {
      decoration: none;
    }

    button {
      padding: 0;
      border: none;
      background: none;
    }
  }
`;
