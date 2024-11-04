import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';


import {
    getAllContacts,
    routGetContactById,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController,
} from '../controllers/contactsController.js';

import { validateBody, } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';



const router = express.Router();
const jsonParser = express.json({
    type: 'application/json',
  });

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:id', isValidId, ctrlWrapper(routGetContactById));

router.post('/', jsonParser, validateBody(createContactsSchema), ctrlWrapper(createContactController));

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.put('/:id', isValidId, jsonParser, validateBody(updateContactsSchema), ctrlWrapper(upsertContactController));

router.patch('/:id', isValidId, jsonParser, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));

export default router;
