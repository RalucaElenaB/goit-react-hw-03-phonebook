import { useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState({
    contacts: initialContacts,
    filter: '',
    name: '',
    number: '',
  });

  const handleOnDeleteContact = id => {
    setContacts(prevContacts => ({
      ...prevContacts,
      contacts: prevContacts.contacts.filter(contact => contact.id !== id),
    }));
  };

  const handleFilterChange = event => {
    const filterValue = event.target.value.toLowerCase();
    setContacts(prevContacts => ({ ...prevContacts, filter: filterValue }));
  };

  const filteredContacts = contacts.contacts.filter(contact =>
    contact.name.toLowerCase().includes(contacts.filter)
  );

  const handleAddContact = newContact => {
    const isDuplicate = contacts.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts(prevContacts => ({
        ...prevContacts,
        contacts: [...prevContacts.contacts, { ...newContact, id: nanoid() }],
      }));
    }
  };

  return (
    <section>
      <h1>Phonebook</h1>
      <div className="AddContacts">
        <h3>Add a contact</h3>
        <ContactForm onAddContact={handleAddContact} />
      </div>
      <div className="SearchContacts">
        <h3>Search a contact</h3>
        <Filter value={contacts.filter} onChange={handleFilterChange} />
      </div>
      <div className="ContactsList">
        <h3>Contacts list</h3>
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleOnDeleteContact}
        />
      </div>
    </section>
  );
};
