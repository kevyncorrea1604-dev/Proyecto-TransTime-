
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentación de la API
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

const rutaRoutes = require('./routes/ruta.route');
const busetaRoutes = require('./routes/buseta.route');
const recorridoRoutes = require('./routes/recorrido.route');
const puntointermedioRoutes = require('./routes/puntointermedio.route');
const empresaRoutes = require('./routes/empresa.route');
const puntoreferenciaRoutes = require('./routes/puntoreferencia.route');
const rutapuntoreferenciaRoutes = require('./routes/rutapuntoreferencia.route');
const mantenimientoRoutes = require('./routes/mantenimiento.route');
const incidenteRoutes = require('./routes/incidente.route');
const conductorRoutes = require('./routes/conductor.route');
const notificacionRoutes = require('./routes/notificacion.route');
const usuarioRoutes = require('./routes/usuario.route');
const favoritoRoutes = require('./routes/favorito.route');
const historialrutaRoutes = require('./routes/historialruta.route');
const ubicacionRoutes = require('./routes/ubicacion.route');
const tarifaRoutes = require('./routes/tarifa.route');

app.use('/api/busetas', busetaRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/recorridos', recorridoRoutes);
app.use('/api/puntos_intermedios', puntointermedioRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/punto_referencia', puntoreferenciaRoutes);
app.use('/api/ruta_punto_referencia', rutapuntoreferenciaRoutes);
app.use('/api/mantenimiento', mantenimientoRoutes);
app.use('/api/incidente', incidenteRoutes);
app.use('/api/conductor', conductorRoutes);
app.use('/api/notificacion', notificacionRoutes);
app.use('/api/favorito', favoritoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/historial_ruta', historialrutaRoutes);
app.use('/api/ubicacion', ubicacionRoutes);
app.use('/api/tarifa', tarifaRoutes);

module.exports = app;
