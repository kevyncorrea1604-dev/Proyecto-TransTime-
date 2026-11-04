
const pool = require('../config/db');

class Ruta {
    // Consultar todas las rutas
    static async obtenerTodas() {
        const [filas] = await pool.execute(
            'SELECT * FROM ruta'
        );

        return filas;
    }

    // Buscar una ruta por su ID
    static async obtenerPorId(id) {
        const [filas] = await pool.execute(
            'SELECT * FROM ruta WHERE IdRuta = ?',
            [id]
        );

        return filas[0] || null;
    }

    // Registrar una ruta
    static async crear(datos) {
        const sql = `
            INSERT INTO ruta
            (NumeroRuta, Origen, Destino, Estado, IdEmpresa)
            VALUES (?, ?, ?, ?, ?)
        `;

        const valores = [
            datos.NumeroRuta,
            datos.Origen,
            datos.Destino,
            datos.Estado || 'Activa',
            datos.IdEmpresa
        ];

        const [resultado] = await pool.execute(sql, valores);

        return this.obtenerPorId(resultado.insertId);
    }

    // Modificar los datos de una ruta
    static async actualizar(id, datos) {
        const sql = `
            UPDATE ruta
            SET NumeroRuta = ?,
                Origen = ?,
                Destino = ?,
                Estado = ?,
                IdEmpresa = ?
            WHERE IdRuta = ?
        `;

        const valores = [
            datos.NumeroRuta,
            datos.Origen,
            datos.Destino,
            datos.Estado,
            datos.IdEmpresa,
            id
        ];

        const [resultado] = await pool.execute(sql, valores);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.obtenerPorId(id);
    }

    // Cambiar el estado de una ruta
    static async cambiarEstado(id, estado) {
        const [resultado] = await pool.execute(
            'UPDATE ruta SET Estado = ? WHERE IdRuta = ?',
            [estado, id]
        );

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.obtenerPorId(id);
    }
}

module.exports = Ruta;
