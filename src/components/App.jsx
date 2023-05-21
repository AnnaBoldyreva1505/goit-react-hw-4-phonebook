import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onDelete = (id, name) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    toast.success(`Contact with name ${name} is deleted`);
  };

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    contacts.find(contact => contact.name === name)
      ? toast.error(`${name} is already in the contact list`)
      : setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList contacts={getVisibleContacts()} onDelete={onDelete} />
    </div>
  );
};

