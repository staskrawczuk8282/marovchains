import React, { useState, useEffect } from 'react';
import paper from '../Assets/paper.png';
import rock from '../Assets/rock.png';
import scissors from '../Assets/scissors.png';
import './Game.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";

function Game() {
    const [playerScore, setPlayerScore] = useState(0);
    const [modelScore, setModelScore] = useState(0);
    const [gameOutcome, setGameOutcome] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch scores from the API after every button click
        fetchScores();
    }, [playerScore, modelScore]);

    useEffect(() => {
        const userToken = localStorage.getItem('token'); // You may adjust where you store your token
        if (userToken) {
            setToken(userToken);
        }
    }, []);

    const fetchScores = async () => {
        try {
            const response = await fetch('https://markovportfolio.azurewebsites.net/api/Play/score', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setPlayerScore(data.playerScore);
            setModelScore(data.modelScore);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    const handleImageClick = async (userPlay) => {
        try {
            // Call the API to play the game
            const response = await fetch(`https://markovportfolio.azurewebsites.net/api/Play/play?userPlay=${userPlay}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.text();
            setGameOutcome(data);
            fetchScores();
        } catch (error) {
            console.error('Error playing the game:', error);
        }
    };

        const handleLogout = () => {
        try {
            // Handle successful login, e.g., store token in local storage
            localStorage.clear('token');
            // Notify parent component about successful login
            // Redirect to the game page
            navigate('/'); // Use navigate to redirect to the game page
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="game-container">
            <div className="score-container">
                <p>Model Score: {modelScore}</p>
                <p>Player Score: {playerScore}</p>
            </div>
            {gameOutcome && <p className="outcome-message">{gameOutcome}</p>}
            <div className="button-container">
                <button className="button" onClick={() => handleImageClick(0)}>
                    <img src={paper} alt="Paper" />
                </button>
                <button className="button" onClick={() => handleImageClick(1)}>
                    <img src={scissors} alt="Scissors" />
                </button>
                <button className="button" onClick={() => handleImageClick(2)}>
                    <img src={rock} alt="Rock" />
                </button>
            </div>
            <div className="submit-container">
            <div className='logout' onClick={()=>handleLogout()}>
                    Login Out
                </div>
            </div>
        </div>
    );
}

export default Game;