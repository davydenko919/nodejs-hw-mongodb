import { Contact } from '../models/contacts.js';

  const getContacts = async () => {
    try {
        const contacts = await Contact.find();
        return contacts;
      } catch (error) {
        console.error(error);
      }

  };

  export { getContacts };


