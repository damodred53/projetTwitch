import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';





function Games() {
    
    const [finalArray, setFinalArray] = useState([]);
    
    /*const post = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=3j3wwpf1faqw87j8wlxt6ibxtnn32p&redirect_uri=http://localhost:3000/&scope=analytics:read:games"*/
    
    useEffect(() => {
        
        /*var currentURL = window.location.href;

    // Extraire les paramètres de l'URL
    var urlParams = new URLSearchParams(currentURL.split('#')[1]);
    // Vérifier si le paramètre "access_token" est présent dans les paramètres de l'URL
    if (urlParams.has("access_token")) {
        // Récupérer la valeur du paramètre "access_token"
        var accessToken = urlParams.get("access_token"); 
        // Enregistrer le token dans le local storage
        localStorage.setItem("access_token", accessToken); 
        // Afficher un message pour indiquer que le token a été enregistré
        
        const token = localStorage.getItem("access_token");
        if (token != null) {
            getData(token);
        }
    } */
    
    
        
    const getData = async (accessToken) => {
        const token = localStorage.getItem("access_token")
        
        const url = 'https://api.twitch.tv/helix/games/top';
        const headers = {
            'Authorization': `Bearer ${token}` , // Remplacez VOTRE_JETON_D_ACCES par votre jeton d'accès Twitch
            'Client-ID': '3j3wwpf1faqw87j8wlxt6ibxtnn32p' // Remplacez VOTRE_CLIENT_ID par votre ID de client Twitch
        };
    
        try {
            const token = localStorage.getItem("access_token", accessToken)
            
            if (token != null) {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
    
            if (response.ok) {
                const data = await response.json();
                let dataArray = data.data;
                let updatedFinalArray = dataArray.map((jeu) => {
                    let newUrl = jeu.box_art_url.replace("{width}", "250").replace("{height}", "300");
                    jeu.box_art_url = newUrl;
                    
                    return jeu  
                });setFinalArray(updatedFinalArray)
            } else {
                console.error('Erreur lors de la requête :', response.status);
            }
            
        }} catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    };
    
    getData();
},[]); 

    return (
        <div>

            <h1 className="titreGames">Jeux les plus populaires</h1>

            <div className="flexAccueil">

                {finalArray.map((game,index) => (
                    
                    <div key={index} className="carteGames">
                        
                        <img src={game.box_art_url} alt="jeu profile pic" className="imgCarte"></img>
                            <div className="cardBodyGames">
                                <h5 className="titreCarteGames">{game.name}</h5>

                                <Link  
                                className="lien"
                                to={
                                    "game/" + game.name}
                                    state= {{
                                        gameID: game.id
                                    }}
                                >
                                    <div className="btnCarte">Regarder {game.name}</div>
                                </Link>
                            </div>

                    </div>
                ))}

            </div>

        </div>
    )
    
}


export default Games;