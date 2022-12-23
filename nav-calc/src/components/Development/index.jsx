import React from 'react';
import { Link } from 'react-router-dom';
import Container from './../Container/index';
import cl from './index.module.scss';
const Development = () => {
  return (
    <Container>
      <div className={cl.content}>
        <h1>Страница находиться на стадии разработки</h1>
        <Link className={cl.link} to="/">На главную</Link>
      </div>
    </Container>
  );
};

export default Development;