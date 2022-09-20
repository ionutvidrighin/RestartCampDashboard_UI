import React, { useState, useEffect } from 'react';
import { capitalizeWord } from "../utils/helperFunctions";

const DisplayDateAndTime = () => {
  const [time, setTime] = useState("")

  const newDate = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const today = newDate.toLocaleDateString('ro-RO', options)
  const weekDay = newDate.toLocaleDateString('ro-RO', {weekday: 'long'})

  useEffect(() => {
    const incrementTime = () => {
      const date = new Date();

      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      setTime(`${hour}:${minutes}:${seconds}`);
    }

    const intervalId = window.setInterval(incrementTime, 1000);

    return () => {
      window.clearInterval(intervalId);
    }
  }, [])

  return (
    <div className='current-time'>
      <p className="fw-bold m-0">
        <span>
          {`${capitalizeWord(weekDay)}, ${today} - `}
        </span>
        <span>{time}</span>
      </p>
    </div>
  )
}

export default DisplayDateAndTime