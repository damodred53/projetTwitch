import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';


function GameStreams() {

    let location = useLocation();
    let {slug} = useParams();
    
    const [streamData, setStreamData] = useState([]);
    const [viewer, setViewer] = useState(0);

    useEffect(() => {
        async function fetchStreams() {
            const token = localStorage.getItem("access_token");
            const url_streameurs = `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`;
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
                        const dataArray = await response.json();
                        console.log(dataArray.data)
                        const TheArray = dataArray.data
                        const finalArray = TheArray.map(stream => {
                            const newURL = stream.thumbnail_url
                            .replace('{width}', "320")
                            .replace('{height}', "180");
                            stream.thumbnail_url = newURL 
                            
                            return stream
                        });setStreamData(finalArray)

                    }
                }
            } catch (error) {
                console.error(error);
            }
            
        }
        
        fetchStreams(); 
    }, []);

    console.log(streamData)
    
    return (
        <div>
            
            <h1 className='titreGamesStreams'>Stream : {slug}</h1>
            <h3 className='sousTitreGameStreams'>
                <strong className='textColored'>{viewer}</strong> personnes regardent {slug}
            </h3>

            <div className='flexAccueil'>

                {streamData.map((stream, index) => (
                    <div key={index} className='carteGameStreams'>

                        <img src={stream.thumbnail_url} className='imgCarte' alt='imagemappé'/>

                        <div className='cardBodyGameStreams'>

                            <h5 className='titreCartesStream'> {stream.user_name}</h5>
                            <p className='txtStream'>Nombre de visiteurs : {stream.viewer_count}</p>

                            <Link  
                                className="lien"
                                to={
                                    `/live/${stream.user_login}`
                                }
                                >
                                    <div className="btnCarte">Regarder {stream.user_name}</div>
                            </Link>

                        </div>
                    </div> 
                ))}



            </div>
           
        </div>
    )
}

export default GameStreams;