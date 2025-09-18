import { Router } from 'express';
import { getContactsController, getContactsByIdController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

export default router;
