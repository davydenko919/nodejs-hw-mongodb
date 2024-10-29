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
  const rawResult = await Contact.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      upsert: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    student: rawResult,
    isNew: !rawResult.createdAt || rawResult.createdAt === rawResult.updatedAt,
  };
};





  export { getContacts, getContactById, createContact };


