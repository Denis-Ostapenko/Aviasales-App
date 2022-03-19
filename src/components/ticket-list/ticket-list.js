/* eslint-disable react/no-array-index-key */
/* eslint-disable spaced-comment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import Ticket from '../ticket/ticket';
import classes from './ticket-list.module.scss';

class TicketList extends Component {

  //Если надо получить всю пачку билетов
  // componentDidUpdate() {
  //   const { fetchPacketTickets, searchId, stopTickets } = this.props
  //   if (stopTickets === false) {
  //     fetchPacketTickets(searchId)
  //   }
  // }

  filterPacketTickets(packetTickets) {
    const { filter } = this.props;
    const activeFilter = [];
    filter.forEach(element => {
      if (element.isCheck) {
        activeFilter.push(element.name);
      }
    });
    let newPacketTickets = [];
    packetTickets.forEach(ticket => {
      activeFilter.forEach(filterName => {
        if (filterName === 'all') {
          newPacketTickets = [...packetTickets]
        }
        if (filterName !== 'all' && filterName === '0') {
          if (ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0) {
            newPacketTickets.push(ticket);
          }
        }
        if (filterName !== 'all' && filterName === '1') {
          if (ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1) {
            newPacketTickets.push(ticket);
          }
        }
        if (filterName !== 'all' && filterName === '2') {
          if (ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2) {
            newPacketTickets.push(ticket);
          }
        }
        if (filterName !== 'all' && filterName === '3') {
          if (ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3) {
            newPacketTickets.push(ticket);
          }
        }
      })
    });
    return newPacketTickets
  }

  sortPacketTickets(packetTickets) {
    const { sortButtons } = this.props;
    let activeSortButtons = '';

    sortButtons.forEach(element => {
      if (element.isActive) {
        activeSortButtons = element.name
      }
    });
    const newPacketTickets = [];
    packetTickets.forEach(ticket => {
      const sumTime = ticket.segments[0].duration + ticket.segments[1].duration;
      const priceMinute = ticket.price / sumTime;
      const newTicket = { ...ticket, sumTime, priceMinute };
      newPacketTickets.push(newTicket);
    })
    if (activeSortButtons === 'inexpensive') {
      newPacketTickets.sort((firstTicket, lastTicket) => firstTicket.price - lastTicket.price);
    }
    if (activeSortButtons === 'quick') {
      newPacketTickets.sort((firstTicket, lastTicket) => firstTicket.sumTime - lastTicket.sumTime);
    }
    if (activeSortButtons === 'optimal') {
      newPacketTickets.sort((firstTicket, lastTicket) => firstTicket.priceMinute - lastTicket.priceMinute);
    }
    return newPacketTickets
  }


  render() {
    const { howManyTickets, packetTickets, filter } = this.props;
    const activeFilter = [];
    filter.forEach(element => {
      if (element.isCheck) {
        activeFilter.push(element.name);
      }
    });
    const newPacketTickets = (this.sortPacketTickets(this.filterPacketTickets(packetTickets)));
    const alert = activeFilter.length === 0 ? <Alert className={classes['alert-info']} message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" /> : null;
    return (
      <ul className={classes['ticket-list']}>
        {newPacketTickets?.map((item, i) => {
          if (i < howManyTickets) {
            return <li key={i + 1} className={classes['ticket-list__item']}><Ticket ticket={item} /></li>;
          }
          return null;
        })}
        {alert}
      </ul>
    );
  }
}

const mapStateToProps = ({ packetTickets, sortButtons, filter, howManyTickets }) => ({ packetTickets, sortButtons, filter, howManyTickets });

TicketList.defaultProps = {
  packetTickets: [],
  sortButtons: [],
  filter: [],
  howManyTickets: 5
};

TicketList.propTypes = {
  packetTickets: PropTypes.arrayOf(PropTypes.object),
  sortButtons: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.arrayOf(PropTypes.object),
  howManyTickets: PropTypes.number
};

export default connect(mapStateToProps)(TicketList);