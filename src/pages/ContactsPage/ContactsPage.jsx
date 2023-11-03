import ContactFilter from 'components/ContactFilter/ContactFilter';
import Loader from 'components/helper/Loader';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectContactsFilterTerm,
  selectContactsIsLoading,
} from 'redux/contacts.selectors';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from 'redux/contactsReducer';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filterTerm = useSelector(selectContactsFilterTerm);
  const isLoading = useSelector(selectContactsIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onSubmit = contact => {
    // Проверка на уникальность имени
    const isDuplicateName = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicateName) {
      alert('Contact with the same name already exists.');
      reset({ name: '', number: '' });
    } else {
      dispatch(addContact(contact));
      reset();
    }
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={css.contactContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.contactForm}>
        <label className={css.nameLebel}>
          <span className={css.nameInfo}>Name:</span>
          <input
            placeholder="Contact name"
            className={css.nameInput}
            {...register('name', { required: true })}
            type="text"
          />
          {errors.name && <span>This field is required</span>}
        </label>
        <label className={css.numberLebel}>
          <span className={css.numberInfo}>Number:</span>
          <input
            pattern="\+?[0-9\s\-\(\)]+"
            placeholder="Contact phone number"
            className={css.numberInput}
            {...register('number', { required: true })}
            type="text"
          />
          {errors.number && <span>This field is required</span>}
        </label>

        <button type="submit" className={css.addButton}>
          Add contact
        </button>
      </form>
      <ContactFilter />

      {isLoading && <Loader />}
      <ul className={css.contactsItem}>
        {Array.isArray(contacts) &&
          contacts
            .filter(contact =>
              contact.name.toLowerCase().includes(filterTerm.toLowerCase())
            )
            .map(contact => {
              return (
                <li key={contact.id} className={css.contactsList}>
                  <h3 className={css.contactsName}>{contact.name}</h3>
                  <p className={css.contactsNumber}>{contact.number}</p>
                  <button
                    className={css.deleteButton}
                    onClick={() => onDeleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default ContactsPage;
