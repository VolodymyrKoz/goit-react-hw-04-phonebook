import React, { useState, useEffect } from 'react';
import Form from './_01-form';
import Filter from './_02-filter';
import List from './_03-List';
import css from '../app.module.scss';


export const App = () => {
  const [value, setValue] = useState('');
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromStorage);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = data => {
    if (data.length >= 0) {
      setContacts([...data]);
    } else {
      setContacts(prevContacts => [...prevContacts, data]);
    }
  };

  const filter = valueFilter => {
    setValue(valueFilter);
  };

  return (
    <div className={css['vrapper']}>
      <h1 className={css['vrapper__title']}>Phonebook</h1>
      <Form alert={contacts} onSubmit={formSubmit} />
      <h2 className={css['vrapper__title']}>Contacts</h2>
      <Filter filter={filter} />
      <List filterValue={value || ''} data={contacts || []} onSubmit={formSubmit} />
    </div>
  );
};
