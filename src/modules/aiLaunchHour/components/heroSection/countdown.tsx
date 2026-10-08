'use client';

import { useEffect, useState } from 'react';
import { EVENT_START } from '../../constants';
import styles from '../../styles.module.css';

const target = new Date(EVENT_START).getTime();
const units = ['Days', 'Hours', 'Mins', 'Secs'];

/** Remaining [days, hours, minutes, seconds], or null once the sprint has started. */
const getRemaining = (): number[] | null => {
  const distance = target - Date.now();
  if (distance <= 0) return null;

  return [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000),
  ];
};

const Countdown = () => {
  // Undefined until mounted, so the server render shows "--" placeholders and hydration matches.
  const [remaining, setRemaining] = useState<number[] | null>();

  useEffect(() => {
    const tick = () => setRemaining(getRemaining());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.countdown} aria-live="polite">
      {remaining === null ? (
        <div className={styles.countdownLive}>
          <strong>LIVE</strong>
          <span>The sprint is on</span>
        </div>
      ) : (
        units.map((unit, index) => (
          <div key={unit}>
            <strong>{remaining ? String(remaining[index]).padStart(2, '0') : '--'}</strong>
            <span>{unit}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Countdown;
