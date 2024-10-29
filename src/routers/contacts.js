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

const router = express.Router();
const jsonParser = express.json({
    type: 'application/json',
  });

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:id', ctrlWrapper(routGetContactById));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.put('/:id', jsonParser, ctrlWrapper(upsertContactController));

router.patch('/:id', jsonParser, ctrlWrapper(patchContactController));

export default router;
