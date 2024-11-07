module.exports = (sequelize, Sequelize) => {
	const Juego = sequelize.define('juego', {	
		idJuego: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	},
        nombreJuego: {
            type: Sequelize.STRING
    },
        genero: {
            type: Sequelize.STRING
    },
        plataforma: {
            type: Sequelize.STRING
    },
        fechaLanzamiento: {
            type: Sequelize.DATE
    },
        precioAlquiler: {
            type: Sequelize.INTEGER
    },
        disponibilidad: {
            type: Sequelize.INTEGER
    },
        fechaAlquiler: {
            type: Sequelize.DATE
    },
        fechaDevolucion: {
            type: Sequelize.DATE
    },
        nombreCliente: {
            type: Sequelize.STRING
    },
        comentarios: {
            type: Sequelize.STRING
    },

	});
	
	return Juego;
}