import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getAllContacts,
    routGetContactById,
    createContactController,
    deleteContactController,
    upsertContactController,
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContacts));

router.get('/:id', ctrlWrapper(routGetContactById));

router.post('/', ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.put('/:id', ctrlWrapper(upsertContactController));

router.patch('/:id', ctrlWrapper(patchStudentController));

export default router;
