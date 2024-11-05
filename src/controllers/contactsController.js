import { createContact, deleteContact, getContacts, patchContact, updateContact } from '../services/contactsService.js';
import { getContactById } from '../services/contactsService.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';


export const getAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getContacts({ page, perPage, sortBy, sortOrder, });
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const routGetContactById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await getContactById(id);

  if (contact === null) {
    return next(new createHttpError(404, 'Student not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const resault = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: resault,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;

  const result = await updateContact(
    id,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      isFavourite: req.body.isFavourite,
      contactType: req.body.contactType,
    },
    {
    upsert: true,
    }
);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.student,
  });
};


export const patchContactController = async (req, res, next) => {
  const { id } = req.params;


  const result = await patchContact(id, req.body);

  if (result === null) {
    next(createHttpError(404, 'Contact not found'));

    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.student,
  });
};
