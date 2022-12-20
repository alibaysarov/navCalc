import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import HomeNavCards from '../components/HomeNavCards';
const Home = () => {
    const styles={
        container:{
            marginTop:70+'px',
            marginBottom:70+'px'
        }
    }
    return (
        <>
        <Header/>
        <Container styles={styles.container}>
            <HomeNavCards/>  
        </Container>
        </>
        
    );
};

export default Home;