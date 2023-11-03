import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  requestAddContact,
  requestAllContacts,
  requestDeleteContact,
} from 'services/phonebookApi';

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await requestAllContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const contact = await requestAddContact(newContact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkAPI) => {
    try {
      const deletedContact = await requestDeleteContact(contactId);
      return deletedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  error: null,
  filterTerm: '',
  filteredContacts: null,
};

const filterContacts = (contacts, filterTerm) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterTerm.toLowerCase())
  );
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    setFilterTerm: (state, action) => {
      state.filterTerm = action.payload;
      state.filteredContacts = filterContacts(state.contacts, state.filterTerm);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
        state.filteredContacts = filterContacts(
          state.contacts,
          state.filterTerm
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.contacts)) {
          state.contacts.unshift(action.payload);
          state.filteredContacts = filterContacts(
            state.contacts,
            state.filterTerm
          );
        } else {
          state.contacts = [action.payload];
          state.filteredContacts = filterContacts(
            state.contacts,
            state.filterTerm
          );
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
        state.filteredContacts = filterContacts(
          state.contacts,
          state.filterTerm
        );
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const { setFilterTerm } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
