import { createContact, deleteContact, getContacts, updateContact } from '../services/contactsService.js';
import { getContactById } from '../services/contactsService.js';
import createHttpError from 'http-errors';

export const getAllContacts = async (req, res) => {
  // try {
  //   const contacts = await getContacts();
  //   res.json({
  //     status: 200,
  //     message: "Successfully found contacts!",
  //     data: contacts,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     status: 500,
  //     message: "Internal Server Error",
  //     error: error.message
  //   });
  // }
  const contacts = await getContacts();
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const routGetContactById = async (req, res, next) => {
  const { id } = req.params;

  // try {
  //   const contacts = await getContactById(id);
  //   if (contacts == null) {
  //     return res.status(404).send('Contact not found');
  //   }
  // res.json({
  //   status: 200,
  //   message: `Successfully found contact with id ${id}!`,
  //   data: contacts,
  // });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Internal Server Error');
  // }

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
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

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

export const patchStudentController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.student,
  });
};
