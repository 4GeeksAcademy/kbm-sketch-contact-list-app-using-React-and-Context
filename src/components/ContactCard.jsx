import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactCard = ({ contact }) => {
  const { deleteContact } = useGlobalReducer();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contact.id);
    }
  };

  return (
    <li className="list-group-item py-3">
      <div className="row align-items-center">
        <div className="col-auto">
          <img
            src={"https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"}
            alt={contact.name}
            className="rounded-circle"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        </div>

      
        <div className="col">
          <h5 className="mb-1">{contact.name}</h5>
          <p className="mb-1 text-muted">
            <i className="fas fa-map-marker-alt me-2"></i>
            {contact.address}
          </p>
          <p className="mb-1 text-muted">
            <i className="fas fa-phone me-2"></i>
            {contact.phone}
          </p>
          <p className="mb-0 text-muted">
            <i className="fas fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>

       
        <div className="col-auto text-end">
          <Link to={`/edit/${contact.id}`} className="btn btn-link text-primary p-0 me-2">
            <i className="fas fa-pencil-alt"></i>
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-link text-danger p-0"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ContactCard;