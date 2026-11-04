require('dotenv').config();

const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        const conexion = await pool.getConnection();

        console.log('Conexión con MySQL exitosa');
        console.log(`Base de datos: ${process.env.DB_NAME}`);

        conexion.release();

        app.listen(PORT, () => {
            console.log(
                `TRANSTIME ejecutándose en http://localhost:${PORT}`
            );
            console.log(
                `Swagger disponible en http://localhost:${PORT}/api-docs`
            );
        });
    } catch (error) {
        console.error(
            'Error de conexión con MySQL:',
            error.message
        );
        process.exit(1);
    }
}

iniciarServidor();