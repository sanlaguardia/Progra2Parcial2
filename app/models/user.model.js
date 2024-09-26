module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {	
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	},
        nombre: {
            type: Sequelize.STRING
    },
        email: {
            type: Sequelize.STRING
    },
        contraseña: {
            type: Sequelize.STRING
    },
        fechaCreacion: {
            type: Sequelize.DATE
    },

	});
	
	return User;
}