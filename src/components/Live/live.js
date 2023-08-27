import React, {useState, useEffect} from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import {useParams} from 'react-router-dom';



function Live() { 

    let {slug} = useParams();
    const [streamName, setStreamName] = useState([]);
    const [streamTitle, setStreamTitle] = useState([]);
    const [languageStream, setLanguageStream] = useState([]);
    const [viewerStream, setviewerStream] = useState([]);
    const [GameStream, setGameStream] = useState([]);
    
    useEffect(() => {
        async function fetchStreams() {
            const token = localStorage.getItem("access_token");
            const url_streameurs = `https://api.twitch.tv/helix/streams?user_login=${slug}`;
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
                        const userName = dataArray[0].user_name
                        const userTitle = dataArray[0].title
                        const userLanguage = dataArray[0].language
                        const userViewer = dataArray[0].viewer_count
                        const userGame = dataArray[0].game_name
                        console.log(dataArray);
                        setStreamName(userName); 
                        setStreamTitle(userTitle);
                        setLanguageStream(userLanguage);
                        setviewerStream(userViewer);
                        setGameStream(userGame);
                    }
                }
            } catch (error) {
                console.error(error);
            }
            
        }
        
        fetchStreams(); 
    }, [slug]);

    
    return (
        
        <div className='containerDecale'>
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
            <div className='contInfo'>
                
                <div className='titreStream'>{streamTitle}</div>
                <div className='viewer'>Viewers : {viewerStream}</div>
                
                <div className='infoGame'>Streamer : {streamName}, &nbsp; Langue : {languageStream}</div>
                <div className='nomJeu'>Jeu : {GameStream}</div>
            </div>
        </div>
    )
}

export default Live;