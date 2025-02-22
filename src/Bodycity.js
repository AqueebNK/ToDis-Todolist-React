import React from 'react';

export default function Bodycity({ city, temperature, timezone, feelslike, pressure, sealevel }) {
  // If timezone is not available yet, default to '--'
  const date = timezone === 0 ? '--/--/--' : new Date(new Date().getTime() + timezone * 1000).toLocaleDateString();
  const time = timezone === 0 ? '- : - : -' : new Date(new Date().getTime() + timezone * 1000).toLocaleTimeString();

  return (
    <div className="bcity">
      <div className='citysidest'>
          <div className="inf">
                <div className="feel">
                  <p>Feels like </p>
                  <h1>{feelslike}</h1>
                </div>  
            <div className="winf">   
              <h1>{city}</h1>  {/* City passed as prop */}
              <h2>{date}</h2>  {/* Date based on local timezone or '--' */}
              <h3>At {time}</h3>  {/* Time based on local timezone or '--' */}
            </div>  
          </div>
      </div>
      <div className="citysidend">
          <div className="sp">
            <div className="pressure">
              <img
                src="https://img.icons8.com/?size=100&id=1418&format=png&color=000000"
                alt="Pressure Icon"
              />
              <h3 className="hu">{pressure}</h3>
              <p>Humidity</p>
            </div>
            <div className="sealevel">
              <img
                src="https://img.icons8.com/?size=100&id=3023&format=png&color=000000"
                alt="Sea Level Icon"
              />
              <h3 className="win">{sealevel}</h3>
              <p>Wind Speed</p>
            </div>
          </div>  
      </div>
    </div>  
  );
}
