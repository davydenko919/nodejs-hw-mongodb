import { Contact } from '../db/models/contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
  // const getContacts = async () => {
  //   const contacts = await Contact.find();
  //   return contacts;
  // };

  const getContacts = async ({  
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
  }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    
  
    const contactsQuery = Contact.find();
    const contactsCount = await Contact.find()
      .merge(contactsQuery)
      .countDocuments();
  
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
  
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
  
    return {
      data: contacts,
      ...paginationData,
    };
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

export const patchContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      upsert: false,
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


