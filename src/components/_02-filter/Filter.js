import React from 'react';
import debounce from 'lodash.debounce';
import PropTypes from "prop-types";
import css from './filter.module.scss'

const Filter = ({ filter }) => {

  const handleValue = evt => {
	filter(evt.target.value)
  };

    return (
        <label className={css['filter']}>
          <p>Find contacts by name{' '}</p>
          <input
		 	 className={css['filter__input']}
            // value={this.state.value}
            type="text"
            placeholder="Find by name..."
            onChange={debounce(handleValue, 1000)}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </label>

    );
  }

  
Filter.propTypes = {
	filter: PropTypes.func.isRequired
  };


export default Filter;
