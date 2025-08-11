
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import ContactListView from './pages/ContactList';
import AddContactView from './pages/AddContact';

export const router = createBrowserRouter(
    createRoutesFromElements(
    
    
      <Route>

          <Route path="/" element={<ContactListView />} />
          <Route path="/add" element={<AddContactView />} />
          <Route path="/edit/:id" element={<AddContactView />} />
        
      </Route>
    )
);