import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }

    div {
      display: flex;
      flex-direction: row;

      button:first-of-type {
        background-color: #4dbaf9 !important;
        margin-right: 15px;
        width: 90px !important;
      }

      button {
        background-color: #f26574;
        color: #fff;
        border-radius: 4px;
        border: 0;
        padding: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 120px;
        text-justify: auto;
        font-weight: bold;
      }
    }
  }
`;

export const Content = styled.div`
  img {
    width: 100%;
    height: 250px;
    margin-top: 15px;
  }

  p {
    width: 100%;
    margin-top: 15px;

    color: #fff;
    text-align: justify;
    letter-spacing: 1px;
    line-height: 1.5;
    font-size: 18px;
  }
`;

export const BottomContent = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;

  color: #666;

  p:first-of-type {
    margin-right: 15px;
  }

  p {
    align-items: center;
    margin-left: 10px;
    font-size: 18px;
  }
`;
