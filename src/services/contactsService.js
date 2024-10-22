import { Contact } from '../models/contacts.js';

  const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
  };

  const getContactById = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
  };

  export { getContacts, getContactById };


