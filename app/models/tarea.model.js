module.exports = (sequelize, Sequelize) => {
	const Tarea = sequelize.define('tarea', {	
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	},
        nombre: {
            type: Sequelize.STRING
    },
        estado: {
            type: Sequelize.STRING
    },
        fechaCreacion: {
            type: Sequelize.DATE
    },
        fechaVencimiento: {
            type: Sequelize.DATE
    },

	});
	
	return Tarea;
}