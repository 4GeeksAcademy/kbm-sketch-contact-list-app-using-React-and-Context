import React, { useEffect, useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from '../components/ContactCard.jsx';

const ContactListView = () => {
  const { contacts, getContacts, setAgendaSlug, agendaSlug } = useGlobalReducer();
  const [inputSlug, setInputSlug] = useState("");
  const [changingSlug, setChangingSlug] = useState(false);

  useEffect(() => {
    if (agendaSlug) getContacts();
  }, [agendaSlug]);

  const handleLoadAgenda = () => {
    const trimmedSlug = inputSlug.trim();
    if (trimmedSlug) {
      setAgendaSlug(trimmedSlug);
      setChangingSlug(false);
    }
  };

  return (
    <div className="container my-4">
      {!agendaSlug || changingSlug ? (
        <div className="mb-4">
          <input
            type="text"
            className="form-control d-inline-block w-auto me-2"
            placeholder="Enter user"
            value={inputSlug}
            onChange={(e) => setInputSlug(e.target.value)}
          />
          <button onClick={handleLoadAgenda} className="btn btn-primary">
            Load User
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Contacts of "{agendaSlug}"</h2>
            <div>
              <a href="/add" className="btn btn-success me-2">
                <i className="fas fa-plus me-2"></i> Add New
              </a>
              <button
                onClick={() => setChangingSlug(true)}
                className="btn btn-outline-secondary"
              >
                Change User
              </button>
            </div>
          </div>

          <ul className="list-group">
            {Array.isArray(contacts) && contacts.length > 0 ? (
              contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            ) : (
              <li className="list-group-item text-center text-muted py-4">
                No contacts found.
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default ContactListView;