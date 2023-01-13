import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import HomeNavCards from '../components/HomeNavCards';
import Loader  from "../components/Loader";
const Home = () => {
    const styles={
        container:{
            marginTop:70+'px',
            marginBottom:70+'px'
        }
    }
    const [pageLoaded,setPageLoaded]=React.useState(false)
    React.useEffect(()=>{
        setPageLoaded(prev=>!prev)
    },[])
    return (
        <>
        <Header/>
        <Container styles={styles.container}>
            {
                pageLoaded
                ?<HomeNavCards/>  
                :<Loader/>
            }
            
        </Container>
        </>
        
    );
};

export default Home;