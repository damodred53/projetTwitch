import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Erreur from '../Erreur/erreur';


function Resultats() {

    let {slug} = useParams();

    const [result, setResult] = useState(true);
    const [streamerInfo, setstreamerInfo] = useState([]);

    let cleanSearch = slug.replace(/ /g, '')

    useEffect(() => {
        async function fetchStreams() {
            const token = localStorage.getItem("access_token");
            const url_streameurs = `https://api.twitch.tv/helix/streams?user_login=${cleanSearch}`;
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Client-ID': '3j3wwpf1faqw87j8wlxt6ibxtnn32p'
            };

            try {
                if (token) {
                    const response = await fetch(url_streameurs, {
                        method: 'GET',
                        headers: headers
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setResult(true)
                        const dataArray = data.data;
                        console.log(dataArray.length)
                        if (dataArray.length === 0) {
                            setResult(false)
                            return
                        }

                        let updatedFinalArray = dataArray.map((jeu) => {
                            let newUrl = jeu.thumbnail_url
                            .replace("{width}", "320")
                            .replace("{height}", "180")
                            jeu.thumbnail_url = newUrl;
                            
                            return jeu  
                        }) 


                        setstreamerInfo(updatedFinalArray)
                        
                    } else {
                        setResult(false)
                    }; 
                }
            } catch (error) {
                console.error(error);
            }
            
        } 
        
        fetchStreams(); 
    },[slug] );
        
    console.log(result)
    return (

        result ? 
    <div>
        <div className='containerDecaleResultats'>
            <h4>Résultats de recherche : </h4>

            {streamerInfo.map((stream, index) => 

                <div key={index} className='carteResultats'>
                    <img src={stream.thumbnail_url} alt='img du streameur' className='imgCarte'/>

                    <div className='cardBodyResults'>
                        <h5 className='titreCartesStream'> {stream.user_login}</h5>
                        <div className='txtResult'>
                            {stream.title}
                        </div>

                        <Link
                        className='lien'
                        to={{pathname: `/live/${stream.user_login}`}}>
                            <div className='btnCarte btnResult'>Regarder : {stream.user_login}</div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </div>
    : 
    <Erreur />
    )
}

export default Resultats;