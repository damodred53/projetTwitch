import React from "react";
import logo from './IconeTwitch.svg';
import Search from './Search.svg';
import menuIco from './menuIco.svg';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Croix from './Croix.svg';

function Header(){

    const [menu, setMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(window.innerWidth);
    const [searchInput, setsearchInput] = useState('');

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    })

    const handleResize = () => {
        setSmallScreen(window.innerWidth)
    }

    const toggleNavRes = () => {
        setMenu(!menu)
    }

    const hideMenu = () => {
        if(menu ===true)
         {setMenu(false)}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleKeyPress = (e) => {
        setsearchInput(e.target.value)
    }

    return (
        <div>
            <nav className="headerTop">
                   {(menu || smallScreen >= 900) && (


                <ul className="listeMenu">
                    <li className="liensNav">
                        <Link className="lien" to="/">
                            <img src={logo} alt="logo twitch" className="logo"/>
                        </Link> 
                    </li>

                    <li onClick={hideMenu} className="liensNav" >
                        <Link className="lien" to="/">
                            Top Games 
                        </Link>
                    </li>
                    
                    <li onClick={hideMenu} className="liensNav" >
                        <Link className="lien" to="/top-streams">
                            Top streams
                        </Link>
                    </li>
                    
                    <li onClick={hideMenu} className="liensNav">
                        <form className="formSubmit" onSubmit={handleSubmit}>

                            <input required value={searchInput} onChange={(e) => handleKeyPress(e) } 
                            type="text" className="inputRecherche"></input>
                            
                            <Link
                            to={
                                `/resultats/${searchInput}`
                            }>
                                <button type="submit">
                                    <img src={Search} alt="icone de loupe" className="logoLoupe"/>
                                </button>
                            </Link>

                        </form>
                    </li>
                </ul>
                )} 
            </nav>


        <div className="menuResBtn">
            <img onClick={toggleNavRes} src={!menu ? menuIco : Croix} alt="icone du menu responsive" className="menuIco"></img>
        </div>


        </div>
    )
}
export default Header;