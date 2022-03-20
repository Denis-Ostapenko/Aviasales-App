import apiServise from '../servises';

const updatePacketTickets = (packetTickets) => ({
  type: 'UPDATE_PACKET_TICKETS',
  payload: packetTickets,
});

const updateSearchId = (searchId) => ({
  type: 'UPDATE_SEARCH_ID',
  payload: searchId,
});

const updateFilter = (filter) => ({
  type: 'UPDATE_FILTER',
  payload: filter,
});

const updateStopTickets = (stopTickets) => ({
  type: 'UPDATE_STOP_TICKETS',
  payload: stopTickets,
});

const updateSortButtons = (sortButtons) => ({
  type: 'UPDATE_SORT_BUTTONS',
  payload: sortButtons,
});

const updateHowManyTickets = () => ({ type: 'UPDATE_HOW_MANY_TICKETS' });

const fetchSearchId = () => (dispatch) => {
  apiServise.getKey().then((searchId) => {
    dispatch(updateSearchId(searchId));
  });
};

const fetchPacketTickets = (searchId) => (dispatch) => {
  apiServise.getTickets(searchId).then((res) => {
    if (res.stop) {
      dispatch(updateStopTickets(res.stop));
    }
    dispatch(updatePacketTickets(res.tickets));
  });
};

export { fetchPacketTickets, fetchSearchId, updateFilter, updateSortButtons, updateHowManyTickets };
