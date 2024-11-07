const db = require('../config/db.config.js');
const User = db.User;

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    let user = {};

    try {
        // Construir objeto User desde el cuerpo de la solicitud
        user.nombre = req.body.nombre;
        user.email = req.body.email;
        user.contraseña = req.body.contraseña;
        user.fechaCreacion = new Date(); // Asignar fecha actual

        // Guardar en la base de datos
        User.create(user).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con ID = " + result.id,
                user: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Obtener todos los usuarios
exports.retrieveAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json({
                message: "¡Usuarios obtenidos exitosamente!",
                users: users
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    let userId = req.params.id;

    User.findByPk(userId)
        .then(user => {
            if (user) {
                res.status(200).json({
                    message: "Usuario obtenido exitosamente con ID = " + userId,
                    user: user
                });
            } else {
                res.status(404).json({
                    message: "Usuario no encontrado con ID = " + userId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Actualizar un usuario por ID
exports.updateUserById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "Usuario no encontrado para actualizar con ID = " + userId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                email: req.body.email,
                contraseña: req.body.contraseña
            };

            let result = await User.update(updatedObject, {
                returning: true,
                where: { id: userId }
            });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el usuario con ID = " + userId,
                    error: "No se puede actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Usuario actualizado exitosamente con ID = " + userId,
                    user: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el usuario con ID = " + userId,
            error: error.message
        });
    }
};

// Eliminar un usuario por ID
exports.deleteUserById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "No existe un usuario con ID = " + userId,
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con ID = " + userId,
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el usuario con ID = " + userId,
            error: error.message,
        });
    }
};

//----------------------------------------------- Proyectos ------------------------------------------
const Proyecto = db.Proyecto;

// Crear un nuevo proyecto
exports.createProyecto = (req, res) => {
    let proyecto = {};

    try {
        // Construir objeto Proyecto desde el cuerpo de la solicitud
        proyecto.nombre = req.body.nombre;
        proyecto.descripcion = req.body.descripcion;
        proyecto.fechaCreacion = req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : new Date(); // Fecha actual si no se envía
        proyecto.fechaVencimiento = req.body.fechaVencimiento ? new Date(req.body.fechaVencimiento) : null;

        // Guardar en la base de datos
        Proyecto.create(proyecto).then(result => {
            res.status(200).json({
                message: "Proyecto creado exitosamente con ID = " + result.id,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Obtener todos los proyectos
exports.retrieveAllProyectos = (req, res) => {
    Proyecto.findAll()
        .then(proyectos => {
            res.status(200).json({
                message: "¡Proyectos obtenidos exitosamente!",
                proyectos: proyectos
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener un proyecto por ID
exports.getProyectoById = (req, res) => {
    let proyectoId = req.params.id;

    Proyecto.findByPk(proyectoId)
        .then(proyecto => {
            if (proyecto) {
                res.status(200).json({
                    message: "Proyecto obtenido exitosamente con ID = " + proyectoId,
                    proyecto: proyecto
                });
            } else {
                res.status(404).json({
                    message: "Proyecto no encontrado con ID = " + proyectoId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Actualizar un proyecto por ID
exports.updateProyectoById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "Proyecto no encontrado para actualizar con ID = " + proyectoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                fechaCreacion: req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : proyecto.fechaCreacion,
                fechaVencimiento: req.body.fechaVencimiento ? new Date(req.body.fechaVencimiento) : proyecto.fechaVencimiento
            };

            let result = await Proyecto.update(updatedObject, {
                returning: true,
                where: { id: proyectoId }
            });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el proyecto con ID = " + proyectoId,
                    error: "No se puede actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Proyecto actualizado exitosamente con ID = " + proyectoId,
                    proyecto: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el proyecto con ID = " + proyectoId,
            error: error.message
        });
    }
};

// Eliminar un proyecto por ID
exports.deleteProyectoById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No existe un proyecto con ID = " + proyectoId,
                error: "404",
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Proyecto eliminado exitosamente con ID = " + proyectoId,
                proyecto: proyecto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el proyecto con ID = " + proyectoId,
            error: error.message,
        });
    }
};

//--------------------------------------- Tareas ----------------------------------------
const Tarea = db.Tarea;

// Crear una nueva tarea
exports.createTarea = (req, res) => {
    let tarea = {};

    try {
        // Construir objeto Tarea desde el cuerpo de la solicitud
        tarea.nombre = req.body.nombre;
        tarea.estado = req.body.estado;
        tarea.fechaCreacion = req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : new Date(); // Fecha actual si no se envía
        tarea.fechaVencimiento = req.body.fechaVencimiento ? new Date(req.body.fechaVencimiento) : null;

        // Guardar en la base de datos
        Tarea.create(tarea).then(result => {
            res.status(200).json({
                message: "Tarea creada exitosamente con ID = " + result.id,
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Obtener todas las tareas
exports.retrieveAllTareas = (req, res) => {
    Tarea.findAll()
        .then(tareas => {
            res.status(200).json({
                message: "¡Tareas obtenidas exitosamente!",
                tareas: tareas
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener una tarea por ID
exports.getTareaById = (req, res) => {
    let tareaId = req.params.id;

    Tarea.findByPk(tareaId)
        .then(tarea => {
            if (tarea) {
                res.status(200).json({
                    message: "Tarea obtenida exitosamente con ID = " + tareaId,
                    tarea: tarea
                });
            } else {
                res.status(404).json({
                    message: "Tarea no encontrada con ID = " + tareaId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Actualizar una tarea por ID
exports.updateTareaById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "Tarea no encontrada para actualizar con ID = " + tareaId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaCreacion: req.body.fechaCreacion ? new Date(req.body.fechaCreacion) : tarea.fechaCreacion,
                fechaVencimiento: req.body.fechaVencimiento ? new Date(req.body.fechaVencimiento) : tarea.fechaVencimiento
            };

            let result = await Tarea.update(updatedObject, {
                returning: true,
                where: { id: tareaId }
            });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la tarea con ID = " + tareaId,
                    error: "No se puede actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Tarea actualizada exitosamente con ID = " + tareaId,
                    tarea: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la tarea con ID = " + tareaId,
            error: error.message
        });
    }
};

// Eliminar una tarea por ID
exports.deleteTareaById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No existe una tarea con ID = " + tareaId,
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Tarea eliminada exitosamente con ID = " + tareaId,
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la tarea con ID = " + tareaId,
            error: error.message,
        });
    }
};
//---------------------------------- Juegos ----------------------------------------
const Juego = db.Juego;

// Crear un nuevo juego
exports.createJuego = (req, res) => {
    let juego = {};

    try {
        // Construir objeto Juego desde el cuerpo de la solicitud
        juego.nombreJuego = req.body.nombreJuego;
        juego.genero = req.body.genero;
        juego.plataforma = req.body.plataforma;
        juego.fechaLanzamiento = req.body.fechaLanzamiento;
        juego.precioAlquiler = req.body.precioAlquiler;
        juego.disponibilidad = req.body.disponibilidad;
        juego.fechaAlquiler = req.body.fechaAlquiler;
        juego.fechaDevolucion = req.body.fechaDevolucion;
        juego.nombreCliente = req.body.nombreCliente;
        juego.comentarios = req.body.comentarios;

        // Guardar en la base de datos
        Juego.create(juego).then(result => {
            res.status(200).json({
                message: "Juego creado exitosamente con ID = " + result.idJuego,
                juego: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Obtener todos los juegos
exports.retrieveAllJuegos = (req, res) => {
    Juego.findAll()
        .then(juegos => {
            res.status(200).json({
                message: "¡Juegos obtenidos exitosamente!",
                juegos: juegos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener un juego por ID
exports.getJuegoById = (req, res) => {
    let juegoId = req.params.id;

    Juego.findByPk(juegoId)
        .then(juego => {
            if (juego) {
                res.status(200).json({
                    message: "Juego obtenido exitosamente con ID = " + juegoId,
                    juego: juego
                });
            } else {
                res.status(404).json({
                    message: "Juego no encontrado con ID = " + juegoId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Actualizar un juego por ID
exports.updateJuegoById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "Juego no encontrado para actualizar con ID = " + juegoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombreJuego: req.body.nombreJuego,
                genero: req.body.genero,
                plataforma: req.body.plataforma,
                fechaLanzamiento: req.body.fechaLanzamiento,
                precioAlquiler: req.body.precioAlquiler,
                disponibilidad: req.body.disponibilidad,
                fechaAlquiler: req.body.fechaAlquiler,
                fechaDevolucion: req.body.fechaDevolucion,
                nombreCliente: req.body.nombreCliente,
                comentarios: req.body.comentarios
            };

            let result = await Juego.update(updatedObject, {
                returning: true,
                where: { idJuego: juegoId }
            });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el juego con ID = " + juegoId,
                    error: "No se puede actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Juego actualizado exitosamente con ID = " + juegoId,
                    juego: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el juego con ID = " + juegoId,
            error: error.message
        });
    }
};

// Eliminar un juego por ID
exports.deleteJuegoById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No existe un juego con ID = " + juegoId,
                error: "404",
            });
        } else {
            await juego.destroy();
            res.status(200).json({
                message: "Juego eliminado exitosamente con ID = " + juegoId,
                juego: juego,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el juego con ID = " + juegoId,
            error: error.message,
        });
    }
};
