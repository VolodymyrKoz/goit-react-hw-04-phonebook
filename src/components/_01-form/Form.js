import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './form.module.scss';

const Form = ({ alert, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    number: ''
  });

  const { name, number } = formData;

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setFormData(prevState => ({
      ...prevState,
      id: nanoid(5),
      [name]: value
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const bullean = alert.find(option => option.name === name);

    if (bullean) {
      alert('Such a name is in the book');
      return;
    }

    onSubmit(formData);
    reset();
  };

  const reset = () => {
    setFormData({
      id: '',
      name: '',
      number: ''
    });
  };

  useEffect(() => {
    console.log('Form component mounted or updated!');
  }, [formData]);

  return (
    <form className={css['form']} onSubmit={handleSubmit}>
      <label className={css['form__label']}>
        <p>Name{' '}</p>
        <input
          className={css['form__input']}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
		  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
		  required
        />
      </label>

      <label className={css['form__label']}>
        <p>Number{' '}</p>
        <input
          className={css['form__input']}
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" 
		  required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

Form.propTypes = {
  alert: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;