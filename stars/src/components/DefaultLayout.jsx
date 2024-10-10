import React, {useEffect, useState} from 'react';
import './DefaultLayout.css';
import {
    Header,
    MainMenu,
    Footer
} from './index';
import axios from "axios";

function DefaultLayout() {
    const url = "https://api.github.com/search/repositories?q=stars:>50&sort=stars";

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url);
                setData(response.data.items);
            } catch (error) {
                console.log('Error', error);
            }
        }

        fetchData();
    }, []);
    return (
        <>
            <Header/>
            <MainMenu data={data}/>
            <Footer/>
        </>
    );

  }

export default DefaultLayout