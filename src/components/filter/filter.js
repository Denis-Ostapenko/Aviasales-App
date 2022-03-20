/* eslint-disable no-param-reassign */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import classes from './Filter.module.scss';

const Filter = (props) => {
  const { filter, updateFilter } = props;

  const onChange = (event) => {
    const newFilter = [...filter];

    if (event.target.name === 'all') {
      newFilter.map((item) => {
        item.isCheck = event.target.checked;
        return item;
      });
    } else {
      newFilter.map((item) => {
        if (item.name === 'all') {
          item.isCheck = false;
        }
        if (event.target.name === item.name) {
          item.isCheck = event.target.checked;
        }
        return item;
      });
    }

    let count = 0;
    newFilter.forEach((element) => {
      if (element.isCheck) {
        count += 1;
      }
    });
    if (count >= 4) {
      newFilter.map((item) => {
        item.isCheck = true;
        return item;
      });
    }
    updateFilter(newFilter);
  };

  const createСheckbox = filter?.map((item) => {
    const { label, name, isCheck } = item;
    return (
      <label key={name} className={classes.filter__element}>
        <input className={classes.filter__checkbox} type="checkbox" checked={isCheck} onChange={onChange} name={name} />
        <span className={classes['filter__custom-checkbox']} />
        {label}
      </label>
    );
  });

  return (
    <div className={classes.filter}>
      <h3 className={classes.filter__title}>Количество пересадок</h3>
      {createСheckbox}
    </div>
  );
};

const mapStateToProps = ({ filter }) => ({ filter });

const mapDispatchToProps = (dispatch) => {
  const { updateFilter } = bindActionCreators(actions, dispatch);
  return { updateFilter };
};

Filter.defaultProps = {
  filter: [
    { label: 'Все', name: 'all', isCheck: true },
    { label: 'Без пересадок', name: '0', isCheck: true },
    { label: '1 пересадка', name: '1', isCheck: true },
    { label: '2 пересадки', name: '2', isCheck: true },
    { label: '3 пересадки', name: '3', isCheck: true },
  ],
};

Filter.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  filter: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
