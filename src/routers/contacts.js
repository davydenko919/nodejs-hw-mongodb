import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getAllContacts,
    routGetContactById,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController,
    // updateContactContoller,
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
// router.put('/:id', jsonParser, ctrlWrapper(updateContactContoller));


router.patch('/:id', jsonParser, ctrlWrapper(patchContactController));

export default router;
