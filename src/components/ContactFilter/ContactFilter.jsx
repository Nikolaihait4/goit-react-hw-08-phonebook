import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsFilterTerm } from 'redux/contacts.selectors';
import { setFilterTerm } from 'redux/contactsReducer';
import css from './ContactFilter.module.css';

const ContactFilter = () => {
  const dispatch = useDispatch();
  const filterTerm = useSelector(selectContactsFilterTerm);

  const handleFilterTerm = value => {
    dispatch(setFilterTerm(value));
  };

  return (
    <div className={css.filterContainer}>
      <label className={css.filterLabel}>
        <h4 className={css.filterInfo}>Search Contact</h4>
        <input
          className={css.filterInput}
          onChange={e => handleFilterTerm(e.target.value)}
          value={filterTerm}
          type="text"
          placeholder="Search contacts"
        />
      </label>
    </div>
  );
};

export default ContactFilter;
