import React from 'react';

export default function Bodyside({ forecast }) {
    // Ensure forecast is an array and slice it to the first 24 items if necessary
    const forecastData = Array.isArray(forecast) ? forecast.slice(0, 24) : [];

    let content;

    if (forecastData.length === 0) {
        content = <h3>Enter city ----</h3>;
    } else {
        content = (
            <ul>
                {forecastData.map((item, index) => (
                    <li key={index}>
                        {/* Displaying only the hour */}
                        <p className="ti">
                            {new Date(item.dt * 1000).toLocaleString('en-US', { hour: '2-digit', hour12: true })}
                        </p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                            alt="Weather Icon"
                            className="wico"
                        />
                        <p className="te">{`${item.main.temp}°C`}</p>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="sidecover">
            <div className="sth">
                <h2>Next 24H</h2>
            </div>
            <div className="sidebox">
                {content}
            </div>
        </div>
    );
}
