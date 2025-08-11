import { useContext, useReducer, createContext, useEffect, useCallback, useState } from "react";
import storeReducer, { initialState } from "../store";

const StoreContext = createContext();
const API_BASE = 'https://playground.4geeks.com/contact/agendas';
const LOCAL_STORAGE_KEY = "agendaSlug";

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState());

  const [agendaSlug, setAgendaSlugState] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "";
  });

  useEffect(() => {
    if (agendaSlug) {
      localStorage.setItem(LOCAL_STORAGE_KEY, agendaSlug);
    }
  }, [agendaSlug]);

  const setAgendaSlug = (slug) => {
    setAgendaSlugState(slug);
  };

  const createAgendaIfNotExists = useCallback(async (slug) => {
    if (!slug) return;
    try {
      const res = await fetch(`${API_BASE}/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

     
      if (!res.ok && res.status !== 400) {
        throw new Error(`Agenda creation failed: ${res.status}`);
      }
    } catch (err) {
      console.error("Error creating agenda", err);
    }
  }, []);

  const getContacts = useCallback(async () => {
    if (!agendaSlug) return;
    try {
      await createAgendaIfNotExists(agendaSlug);
      const res = await fetch(`${API_BASE}/${agendaSlug}/contacts`);
      const data = await res.json();
      dispatch({ type: "GET_CONTACTS", payload: data.contacts || [] });
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  }, [agendaSlug, createAgendaIfNotExists]);

  const addContact = async (contact) => {
    if (!agendaSlug) return;
    try {
      await createAgendaIfNotExists(agendaSlug);
      const res = await fetch(`${API_BASE}/${agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: agendaSlug }),
      });
      const newContact = await res.json();
      dispatch({ type: "ADD_CONTACT", payload: newContact });
    } catch (err) {
      console.error("Error adding contact", err);
    }
  };

  const updateContact = async (id, contact) => {
    if (!agendaSlug) return;
    try {
      const res = await fetch(`${API_BASE}/${agendaSlug}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const updatedContact = await res.json();
      dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
    } catch (err) {
      console.error("Error updating contact", err);
    }
  };

  const deleteContact = async (id) => {
    if (!agendaSlug) return;
    try {
      await fetch(`${API_BASE}/${agendaSlug}/contacts/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      console.error("Error deleting contact", err);
    }
  };

  
  useEffect(() => {
    if (agendaSlug) {
      getContacts();
    }
  }, [agendaSlug, getContacts]);

  return (
    <StoreContext.Provider
      value={{
        contacts: state.contacts,
        agendaSlug,
        setAgendaSlug,
        dispatch,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  return useContext(StoreContext);
}