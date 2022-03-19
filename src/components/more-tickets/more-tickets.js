import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions'
import classes from './more-tickets.module.scss';

const MoreTickets = (props) => {
  const { updateHowManyTickets, filter } = props;
  const activeFilter = [];
  filter.forEach(element => {
    if (element.isCheck) {
      activeFilter.push(element.name);
    }
  });

  const content = activeFilter.length !== 0 ? <button type='button' className={classes['more-tickets-button']} onClick={updateHowManyTickets}> Показать еще 5 билетов! </button> : null;
  return (
    <div>
      {content}
    </div>
  );
}
const mapStateToProps = ({ filter }) => ({ filter });

const mapDispatchToProps = (dispatch) => {
  const { updateHowManyTickets } = bindActionCreators(actions, dispatch)
  return { updateHowManyTickets }
}

MoreTickets.defaultProps = {
  filter: [
    { label: 'Все', name: 'all', isCheck: true },
    { label: 'Без пересадок', name: '0', isCheck: true },
    { label: '1 пересадка', name: '1', isCheck: true },
    { label: '2 пересадки', name: '2', isCheck: true },
    { label: '3 пересадки', name: '3', isCheck: true },
  ]
};

MoreTickets.propTypes = {
  updateHowManyTickets: PropTypes.func.isRequired,
  filter: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreTickets);