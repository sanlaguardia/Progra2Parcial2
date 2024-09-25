module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('model', {	
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	},
        nombre: {
            type: Sequelize.STRING
    },
        apellido: {
            type: Sequelize.STRING
    },
        email: {
            type: Sequelize.STRING
    },
        telefono: {
            type: Sequelize.INTEGER
    },
        direccion: {
            type: Sequelize.STRING
    },
        fechaRegristro: {
            type: Sequelize.DATE
    },
        estado: {
            type: Sequelize.STRING
    },

	});
	
	return Model;
}