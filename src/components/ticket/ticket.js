import React from 'react';
import PropTypes from 'prop-types';
import classes from './ticket.module.scss';

const Ticket = (props) => {
  const { ticket } = props;
  const { price, carrier, segments } = ticket;
  const {
    origin: thereOrigin,
    destination: thereDestination,
    date: thereDate,
    stops: thereStops,
    duration: thereDuration,
  } = segments[0];
  const {
    origin: backOrigin,
    destination: backDestination,
    date: backDate,
    stops: backStops,
    duration: backDuration,
  } = segments[1];

  const convertTime = (item) => {
    if (item.length === 1) {
      return `0${item}`;
    }
    if (item.length === 0) {
      return `00`;
    }
    return item;
  };

  const timeTravel = (mins) => {
    const firstHours = Math.trunc(mins / 60);
    const firstmMinutes = mins % 60;
    const newArr = [`${firstHours}`, `${firstmMinutes}`].map((item) => convertTime(item));
    const [hours, minutes] = newArr;
    return `${hours}ч ${minutes}м`;
  };

  const priceTravel = (cost) => {
    const strPrice = `${cost}`
      .split('')
      .reverse()
      .map((item, i) => {
        if (i === 2) {
          return ` ${item}`;
        }
        return item;
      })
      .reverse()
      .join('');
    return `${strPrice} Р`;
  };

  const dateTravel = (data, time) => {
    const date1 = new Date(data);
    const arrfirst = [`${date1.getHours()}`, `${date1.getMinutes()}`].map((item) => convertTime(item));
    const newDate = new Date(date1.setMinutes(date1.getMinutes() + time));
    const arrlast = [`${newDate.getHours()}`, `${newDate.getMinutes()}`].map((item) => convertTime(item));
    return `${arrfirst[0]}:${arrfirst[1]} - ${arrlast[0]}:${arrlast[1]}`;
  };

  const stopsTravel = (arrStops) => {
    if (arrStops.length === 1) {
      return '1 пересадка';
    }
    if (arrStops.length === 2) {
      return '2 пересадки';
    }
    if (arrStops.length === 3) {
      return '3 пересадки';
    }
    return 'Без пересадок';
  };

  const logo = `//pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className={classes.ticket}>
      <header className={classes.ticket__header}>
        <p className={classes.ticket__price}>{priceTravel(price)}</p>
        <img src={logo} alt="logo" />
      </header>
      <main>
        <div className={classes.ticket__element}>
          <div className="route">
            <span>
              {thereOrigin} – {thereDestination}
            </span>
            <p>{dateTravel(thereDate, thereDuration)}</p>
          </div>
          <div className="lenght">
            <span>В пути</span>
            <p>{timeTravel(thereDuration)}</p>
          </div>
          <div className="stops">
            <span>{stopsTravel(thereStops)}</span>
            <p>{thereStops.join(', ')}</p>
          </div>
        </div>

        <div className={classes.ticket__element}>
          <div className="route">
            <span>
              {backOrigin} – {backDestination}
            </span>
            <p>{dateTravel(backDate, backDuration)}</p>
          </div>
          <div className="lenght">
            <span>В пути</span>
            <p>{timeTravel(backDuration)}</p>
          </div>
          <div className="stops">
            <span>{stopsTravel(backStops)}</span>
            <p>{backStops.join(', ')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

Ticket.defaultProps = {
  ticket: {},
};

Ticket.propTypes = {
  ticket: PropTypes.exact({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.array,
    sumTime: PropTypes.number,
    priceMinute: PropTypes.number,
  }),
};

export default Ticket;
