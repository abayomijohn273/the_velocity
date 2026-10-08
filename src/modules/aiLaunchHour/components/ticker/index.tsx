import { Fragment } from 'react';
import styles from '../../styles.module.css';

const phrases = ['One user', 'One problem', 'One core workflow', 'One live product'];

// The track renders the phrases twice so the -50% translate loops seamlessly.
const Ticker = () => {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {[0, 1].map((run) =>
          phrases.map((phrase) => (
            <Fragment key={`${run}-${phrase}`}>
              <span>{phrase}</span>
              <b>✦</b>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Ticker;
