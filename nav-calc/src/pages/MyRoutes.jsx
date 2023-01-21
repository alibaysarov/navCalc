import React from 'react';
import Container from '../components/Container';
import HeaderBlue from '../components/HeaderBlue';
import RouteBlock from '../components/RouteBlock';
import RouteItem  from "../components/RouteItem";
const MyRoutes = () => {
  const pagestyles={
    topContainer:{
      marginTop:100+'px',
      marginBottom:100+'px'
    }
   }
  return (
    <>
    <HeaderBlue title={'Мои маршруты'}/>
    <Container styles={pagestyles.topContainer}>
     
      <RouteBlock date={'23.01.2022'}/>
      <RouteBlock date={'21.01.2022'}/>
      <RouteBlock date={'20.01.2022'}/>
      
    </Container>
    </>
  );
};

export default MyRoutes;