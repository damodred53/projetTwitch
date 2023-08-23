import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

function Sidebar() {
    const [streams, setStreams] = useState([]); 
    const [users, setUsers] = useState([]);

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
                            let newUrl = jeu.thumbnail_url.replace("{width}", "250").replace("{height}", "300");
                            jeu.thumbnail_url = newUrl;
                            
                            return jeu  
                        });setStreams(updatedFinalArray); 
                        
                        
                        
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        console.log(streams)
        fetchStreams();
    }, []);

    return (
        <div className="sidebar">
            <h2 className="titreSidebar">Chaines recommandées</h2>
            <ul className="listeStream">
                 
                {streams.map((stream, index) => (

                        <Link className="lien"
                        to={{pathname: `/live/${stream.user_name}`}}>

                    <li key={index} className="containerFlexSidebar">
                        <img src={stream.thumbnail_url} alt="image du streameur" className="profilePicRonde"></img>
                        <div className="streamUser">{stream.user_name}</div>
                        <div className="viewerRight">

                            <div className="pointRouge"></div>
                            <div className="viewer_count">{stream.viewer_count}</div>

                        </div>

                        <div className="gameNameSidebar">{stream.game_name}</div>
                    </li>
                    
                    
                    </Link>))}
            </ul>
        </div>
    );
}

export default Sidebar;






