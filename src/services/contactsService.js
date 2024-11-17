import { Contact } from '../db/models/contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


  const getContacts = async ({
    userId,
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  }) => {


    const limit = perPage;
    const skip = (page - 1) * perPage;


    const contactsQuery = Contact.find();

    if (filter.isFavourite) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    contactsQuery.where('userId').equals(userId);

    const [contactsCount, contacts] = await Promise.all([
      Contact.find()
      .merge(contactsQuery)
      .countDocuments(),
      contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec(),
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
      data: contacts,
      ...paginationData,
    };
  };

  const getContactById = async (id, userId) => {
    const contact = await Contact.findOne({ _id: id, userId });
    return contact;
  };

  const createContact = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
  };

  export const deleteContact = async (contactId, userId) => {
    const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

    return contact;
  };


export const updateContact = async (id, userId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: id, userId: userId },
    payload,
    {
      new: true,
      upsert: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
    isNew: !rawResult.createdAt || rawResult.createdAt === rawResult.updatedAt,
  };
};

export const patchContact = async (id, userId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: id, userId: userId },
    payload,
    {
      new: true,
      upsert: false,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
    isNew: !rawResult.createdAt || rawResult.createdAt === rawResult.updatedAt,
  };
};





  export { getContacts, getContactById, createContact };


