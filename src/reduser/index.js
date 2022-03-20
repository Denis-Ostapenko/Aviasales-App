/* eslint-disable default-case */
const initialState = {
    sortButtons: [
      { name: 'inexpensive', label: 'Самый дешевый', isActive: true },
      { name: 'quick', label: 'Самый быстрый', isActive: false },
      { name: 'optimal', label: 'Оптимальный', isActive: false },
    ],
  
    filter: [
      { label: 'Все', name: 'all', isCheck: true },
      { label: 'Без пересадок', name: '0', isCheck: true },
      { label: '1 пересадка', name: '1', isCheck: true },
      { label: '2 пересадки', name: '2', isCheck: true },
      { label: '3 пересадки', name: '3', isCheck: true },
    ],
  
    searchId: '',
  
    stopTickets: false,
  
    packetTickets: [],
  
    howManyTickets: 5,
  };
  
  const reduser = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_SEARCH_ID':
        return {
          ...state,
          searchId: action.payload,
        };
      case 'UPDATE_PACKET_TICKETS':
        return {
          ...state,
          packetTickets: [...state.packetTickets, ...action.payload],
        };
      case 'UPDATE_FILTER':
        return {
          ...state,
          filter: action.payload,
        };
      case 'UPDATE_STOP_TICKETS':
        return {
          ...state,
          stopTickets: action.payload,
        };
      case 'UPDATE_SORT_BUTTONS':
        return {
          ...state,
          sortButtons: action.payload,
        };
      case 'UPDATE_HOW_MANY_TICKETS':
        return {
          ...state,
          howManyTickets: state.howManyTickets + 5,
        };
    }
    return state;
  };
  
  export default reduser;
  