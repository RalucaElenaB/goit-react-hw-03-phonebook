import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: {
        contacts: [],
        filter: '',
        name: '',
        number: '',
      },
    };
  }

  getInitialContacts() {
    const initialContacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
    return initialContacts;
  }

  componentDidMount() {
    const key = 'contacts';
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(key));

    if (dataFromLocalStorage === null || dataFromLocalStorage.length === 0) {
      this.setState({
        contacts: {
          ...this.state.contacts,
          contacts: [
            ...this.state.contacts.contacts,
            //[],
            ...this.getInitialContacts(),
          ],
        },
      });
    } else {
      this.setState({
        contacts: {
          ...this.state.contacts,
          contacts: [...this.state.contacts.contacts, ...dataFromLocalStorage],
        },
      });
    }
  }

  componentDidUpdate() {
    const key = 'contacts';
    console.log('did update');
    localStorage.setItem(key, JSON.stringify(this.state.contacts.contacts));
  }

  handleOnDeleteContact = id => {
    this.setState(prevState => ({
      contacts: {
        ...prevState.contacts,
        contacts: prevState.contacts.contacts.filter(
          contact => contact.id !== id
        ),
      },
    }));
  };

  handleFilterChange = event => {
    const filterValue = event.target.value.toLowerCase();
    this.setState(prevState => ({
      contacts: {
        ...prevState.contacts,
        filter: filterValue,
      },
    }));
  };

  handleAddContact = newContact => {
    const isDuplicate = this.state.contacts.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: {
          ...prevState.contacts,
          contacts: [
            ...prevState.contacts.contacts,
            { ...newContact, id: nanoid() },
          ],
        },
      }));
    }
  };

  render() {
    const { contacts } = this.state;

    const filteredContacts = contacts.contacts.filter(contact =>
      contact.name.toLowerCase().includes(contacts.filter)
    );

    return (
      <section>
        <h1>Phonebook</h1>
        <div className="AddContacts">
          <h3>Add a contact</h3>
          <ContactForm onAddContact={this.handleAddContact} />
        </div>
        <div className="SearchContacts">
          <h3>Search a contact</h3>
          <Filter
            value={contacts.filter || ''}
            onChange={this.handleFilterChange}
          />
        </div>
        <div className="ContactsList">
          <h3>Contacts list</h3>
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleOnDeleteContact}
          />
        </div>
      </section>
    );
  }
}

// export default App;
