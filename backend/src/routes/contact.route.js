import express from 'express'
import {createContactMessage} from '../controllers/contact.controller.js'

const router =  express.Router();

router.post('/contact', createContactMessage);

export default router;