import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams ,Link} from 'react-router-dom';

const AddContactView = () => {
	const { id } = useParams();
	const { contacts, addContact, updateContact } = useGlobalReducer();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
	});

	useEffect(() => {
		if (id && Array.isArray(contacts)) {
			const contact = contacts.find(c => String(c.id) === id);
			if (contact) setFormData(contact);
		}
	}, [id, contacts]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id) {
			updateContact(id, formData);
		} else {
			addContact(formData);
		}
		navigate('/');
	};

	return (
		<div className="container my-5">
			<div className="card shadow-sm">
				<div className="card-body">
					<h4 className="card-title mb-4">{id ? 'Edit Contact' : 'Add New Contact'}</h4>

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Full Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Enter full name"
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="email" className="form-label">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Enter email"
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="phone" className="form-label">Phone</label>
							<input
								type="text"
								className="form-control"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="Enter phone"
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="address" className="form-label">Address</label>
							<input
								type="text"
								className="form-control"
								id="address"
								name="address"
								value={formData.address}
								onChange={handleChange}
								placeholder="Enter address"
								required
							/>
						</div>

						<div className="d-flex justify-content-end">
							<button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/')}>
								Cancel
							</button>
							<button type="submit" className="btn btn-primary">
								{id ? 'Update Contact' : 'Save Contact'}
							</button>
						</div>
						<Link to={`/`} className="btn btn-link text-primary">
							<p>or get back to contacts</p>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddContactView;