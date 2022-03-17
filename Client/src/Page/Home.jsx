import React from 'react'
import AddItems from '../Components/AddItems/AddItems';
import Feature from '../Components/Feature/Feature';
import Navbar from '../Components/Navbar/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar />
            <hr />
            <AddItems />
            <Feature />
        </div>
    )
}

export default Home