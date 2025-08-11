export const initialState=()=>{
  return{
    contacts: [] 
  }
}

export default function storeReducer(state, action = {}) {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload }; 
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] }; 
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    default:
      return state;
  }
}