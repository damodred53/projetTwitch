import React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';



function TopStreams() {

    const [channels, setChannels] = useState([]) 

    useEffect(() => {
        async function fetchStreams() {
            const token = localStorage.getItem("access_token");
            const url_streameurs = 'https://api.twitch.tv/helix/streams';
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
                        
                        const dataArray = data.data
                        let updatedFinalArray = dataArray.map((jeu) => {
                            let newUrl = jeu.thumbnail_url
                            .replace("{width}", "320")
                            .replace("{height}", "180")
                            jeu.thumbnail_url = newUrl;
                            
                            return jeu  
                        });setChannels(updatedFinalArray); 
                        
                        
                        
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchStreams();
    }, []);

    


    return (
        <div>
            <h1 className='titreGames'>Stream les plus populaires</h1>

            <div className='flexAccueil'>
                {channels.map((channel, index) => (
                    <div key={index} className='carteStream'>
                        
                        <img src={channel.thumbnail_url} className='imgCarte' alt='jeu'/>

                        <div className='cardBodyStream'>
                            <h5 className='titreCarteStream'> {channel.user_name} </h5>
                            <p className='txtStream'>Jeu : {channel.game_name}</p>

                            <p className='twtStream viewers'>Viewers : {channel.viewer_count}</p>


                            <Link className='lien' to={{pathname: `/live/${channel.user_login}`, state : {channels : channel.title}}}>
                                <div className='btnCarte'>Regarder {channel.game_name}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    
} 
export default TopStreams;