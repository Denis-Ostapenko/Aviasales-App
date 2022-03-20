import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header';
import Tabs from '../Tabs';
import Loading from '../Loading';
import Filter from '../Filter';
import TicketList from '../Ticket-list';
import MoreTickets from '../More-tickets';
import * as actions from '../../actions';
import classes from './App.module.scss';

class App extends Component {
  componentDidMount() {
    const { fetchSearchId } = this.props;
    fetchSearchId();
  }

  componentDidUpdate() {
    const { searchId, fetchPacketTickets, packetTickets } = this.props;
    if (packetTickets.length === 0) {
      fetchPacketTickets(searchId);
    }
  }

  render() {
    const { packetTickets } = this.props;

    const loading = packetTickets.length === 0 ? <Loading /> : null;

    return (
      <div className={classes['aviasales-app']}>
        <Header />
        <main className={classes['aviasales-app__main']}>
          <div className={classes['aviasales-app__element']}>
            <Filter />
          </div>
          <div className={classes['aviasales-app__element']}>
            {loading}
            <Tabs />
            <TicketList />
            <MoreTickets />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ searchId, packetTickets }) => ({ searchId, packetTickets });

const mapDispatchToProps = (dispatch) => {
  const { fetchSearchId, fetchPacketTickets } = bindActionCreators(actions, dispatch);

  return {
    fetchSearchId,
    fetchPacketTickets,
  };
};

App.defaultProps = {
  searchId: '',
  packetTickets: [],
};

App.propTypes = {
  fetchSearchId: PropTypes.func.isRequired,
  searchId: PropTypes.string,
  packetTickets: PropTypes.arrayOf(PropTypes.object),
  fetchPacketTickets: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
