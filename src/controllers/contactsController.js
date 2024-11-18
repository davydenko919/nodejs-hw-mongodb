import { createContact, deleteContact, getContacts, patchContact, updateContact } from '../services/contactsService.js';
import { getContactById } from '../services/contactsService.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { user: { id: userId } } = req;

  const contacts = await getContacts({ userId, page, perPage, sortBy, sortOrder, filter });
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const routGetContactById = async (req, res, next) => {
  const { id } = req.params;
  const { user: { id: userId } } = req;
  const contact = await getContactById(id, userId);

  if (contact === null) {
    return next(new createHttpError(404, 'contact not found'));
  }

  if (contact.userId.toString() !== req.user.id.toString()) {

    return next(new createHttpError.NotFound('contsct not your:('));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {

  const photo = req.file;

 console.log(photo);


  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
    photo: photoUrl,
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
  const { user: { id: userId } } = req;
  const contact = await deleteContact(id, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const { user: { id: userId } } = req;

  const photo = req.file;


  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }


  const result = await updateContact(
    id, userId,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      isFavourite: req.body.isFavourite,
      contactType: req.body.contactType,
      photo: photoUrl,
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
    data: result.contact,
  });
};


// export const patchContactController = async (req, res, next) => {
//   const { id } = req.params;
//   const { user: { id: userId } } = req;


//   const photo = req.file;
//   console.log(photo);

//   let photoUrl;

//   if (photo) {
//     photoUrl = await saveFileToUploadDir(photo);
//   }

//   const result = await patchContact(id, userId, {...req.body, photo: photoUrl, } );

//   if (result === null) {
//     next(createHttpError(404, 'Contact not found'));

//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a contact!`,
//     data: result.contact,
//   });
// };


export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const { user: { id: userId } } = req;


  const photo = req.file;


  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
    photo: photoUrl,
  };

  const result = await patchContact(id, userId, contact );

  // const result = await patchContact(id, userId, {...req.body, photo: photoUrl, } );

  if (result === null) {
    next(createHttpError(404, 'Contact not found'));

    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
