/* eslint-disable no-param-reassign */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions'
import classes from './tabs.module.scss';

const Tabs = (props) => {
  const { sortButtons, updateSortButtons } = props;

  const buttonClick = (event) => {
    const buttonName = event.target.name;
    const newSortButtons = [...sortButtons];
    newSortButtons.map((item) => {
      if (item.name === buttonName && `${item.isActive}` !== 'true') {
        item.isActive = true;
        return item;
      }
      if (item.name === buttonName && `${item.isActive}` === 'true') {
        return item;
      }
      item.isActive = false;
      return item;
    })
    updateSortButtons(newSortButtons)
  }

  const createSortButtons = sortButtons?.map((item) => {
    const { name, label, isActive } = item;
    return <button key={name} name={name} className={classes.tabs__element} isactive={`${isActive}`} type='button' onClick={buttonClick} >{label}</button>
  })

  return (
    <div className={classes.tabs}>
      {createSortButtons}
    </div>
  );
}

const mapStateToProps = ({ sortButtons }) => ({ sortButtons });

const mapDispatchToProps = (dispatch) => {
  const { updateSortButtons } = bindActionCreators(actions, dispatch);

  return { updateSortButtons }
};

Tabs.defaultProps = {
  sortButtons: [
    { name: 'inexpensive', label: 'Самый дешевый', isActive: true },
    { name: 'quick', label: 'Самый быстрый', isActive: false },
    { name: 'optimal', label: 'Оптимальный', isActive: false },
  ]
};

Tabs.propTypes = {
  updateSortButtons: PropTypes.func.isRequired,
  sortButtons: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);