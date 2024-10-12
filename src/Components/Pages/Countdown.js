// Countdown.js
import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Function to calculate time left between now and the target date
  function calculateTimeLeft() {
    const now = new Date();
    const difference = new Date(targetDate) - now;

    let time = {};
    if (difference > 0) {
      time = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Mins: Math.floor((difference / (1000 * 60)) % 60),
        Secs: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  }

  useEffect(() => {
    // Update countdown every second
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, [targetDate]);

  const timeComponents = Object.keys(timeLeft).map((interval) => (
    <span key={interval}>
      <h5>{timeLeft[interval]}</h5>
      <p>{interval}{" "}</p>
    </span>
  ));

  return (
    <>
      {timeComponents.length ? (
        <>{timeComponents}</>
      ) : (
        <h5>Time's up!</h5>
      )}
    </>
  );
};

export default Countdown;
