import express from 'express';
import TestomonialController from '../../controller/Testomonial/TestomonialController.js';
const { addTestomonial, getAllTestomonial, getTestomonialById, removeTestomonial, updateTestomonialId } = new TestomonialController();

const router = express.Router();

router.post('/addTestomonial', addTestomonial);
router.get('/getTestomonialById/:id', getTestomonialById);
router.get('/getAllTestomonial', getAllTestomonial);
router.delete('/removeTestomonial/:id', removeTestomonial);
router.put('/modifyTestomonial/:id', updateTestomonialId);

export default router;