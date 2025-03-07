import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Control from 'react-leaflet-custom-control';

function ViewWeather({lat, lon, date}) {
    const [data, setData] = useState(null);

    useEffect(() => {
      setData(null);
      const API_ENDPOINT = process.env['REACT_APP_API_URL'];
      const params = {
        lat: lat,
        lon: lon,
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate()
      }
      axios.post(API_ENDPOINT, params)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, [lat, lon, date]);

    return (
      <Control position='topright'>
        <div className="border bg-red-200 bg-opacity-60 border-gray-400 rounded-2xl p-2 m-2 justify-around items-center">
          {data ? (
            <>
              <p className='font-sans font-bold'>{date.getFullYear()}年{date.getMonth()+1}月{date.getDate()}日</p>
              <p>{data["city"]}</p>
              <p>Weather: {data["weather"]}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Control>
    );
}

export default ViewWeather;
