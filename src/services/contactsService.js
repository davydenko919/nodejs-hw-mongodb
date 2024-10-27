import { Contact } from '../db/models/contacts.js';

  const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
  };

  const getContactById = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
  };

  const createContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
  };

  export const deleteContact = async (contactId) => {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
    });

    return contact;
  };

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};



  export { getContacts, getContactById, createContact };


