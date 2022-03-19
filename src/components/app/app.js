import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Tabs from '../tabs/tabs';
import Loading from '../loading/loading';
import Filter from '../filter/filter';
import TicketList from '../ticket-list/ticket-list';
import MoreTickets from '../more-tickets/more-tickets';
import * as actions from '../../actions';
import classes from './app.module.scss';

class App extends Component {
  componentDidMount() {
    const { fetchSearchId } = this.props;
    fetchSearchId();
  }

  componentDidUpdate() {
    const { fetchPacketTickets, searchId, stopTickets } = this.props;
    if (stopTickets === false) {
      fetchPacketTickets(searchId);
    }
  }

  render() {
    const { stopTickets } = this.props;

    const loading = !stopTickets ? <Loading /> : null;

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

const mapStateToProps = ({ stopTickets, searchId }) => ({ stopTickets, searchId });

const mapDispatchToProps = (dispatch) => {
  const { fetchSearchId, fetchPacketTickets } = bindActionCreators(actions, dispatch);

  return {
    fetchSearchId,
    fetchPacketTickets,
  };
};

App.defaultProps = {
  stopTickets: false,
  searchId: '',
};

App.propTypes = {
  fetchSearchId: PropTypes.func.isRequired,
  stopTickets: PropTypes.bool,
  searchId: PropTypes.string,
  fetchPacketTickets: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
