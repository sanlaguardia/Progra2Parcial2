
const express = require('express');
const router = express.Router();
 
const departamentos = require('../controllers/controller.js');

router.post('/api/users/create', departamentos.createUser);
router.get('/api/users/all', departamentos.retrieveAllUsers);
router.get('/api/users/onebyid/:id', departamentos.getUserById);
router.put('/api/users/update/:id', departamentos.updateUserById);
router.delete('/api/users/delete/:id', departamentos.deleteUserById);

router.post('/api/proyetos/create', departamentos.createProyecto);
router.get('/api/proyetos/all', departamentos.retrieveAllProyectos);
router.get('/api/proyetos/onebyid/:id', departamentos.getProyectoById);
router.put('/api/proyetos/update/:id', departamentos.updateProyectoById);
router.delete('/api/proyetos/delete/:id', departamentos.deleteProyectoById);

router.post('/api/tareas/create', departamentos.createTarea);
router.get('/api/tareas/all', departamentos.retrieveAllTareas);
router.get('/api/tareas/onebyid/:id', departamentos.getTareaById);
router.put('/api/tareas/update/:id', departamentos.updateTareaById);
router.delete('/api/tareas/delete/:id', departamentos.deleteTareaById);

router.post('/api/juegos/create', departamentos.createJuego);
router.get('/api/juegos/all', departamentos.retrieveAllJuegos);
router.get('/api/juegos/onebyid/:id', departamentos.getJuegoById);
router.put('/api/juegos/update/:id', departamentos.updateJuegoById);
router.delete('/api/juegos/delete/:id', departamentos.deleteJuegoById);

module.exports = router;