import express from 'express';
import projectController from '../../controller/projectController/projectController.js';
const {addProject,deleteProject,getAllProject,singleProject,updateProject,updateWizard} = projectController;

const router = express.Router();
router.post('/add/data',addProject);
router.get('/getAll/data',getAllProject);
router.delete('/delete/data/:id',deleteProject);
router.get('/fetch/data/:id',singleProject);
router.put('/update/:id',updateProject);
router.post('/wizard/update/:id',updateWizard);

export default router;

