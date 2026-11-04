
const pool = require('../config/db');

class Buseta {
    static async obtenerTodas() {
        const [filas] = await pool.execute(
            'SELECT * FROM buseta'
        );
        return filas;
    }

    static async obtenerPorId(id) {
        const [filas] = await pool.execute(
            'SELECT * FROM buseta WHERE IdBuseta = ?',
            [id]
        );
        return filas[0] || null;
    }

    static async crear(datos) {
        const sql = `
            INSERT INTO buseta
            (IdRuta, IdEmpresa, IdConductor,
             Placa, NumeroInterno, Estado)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            datos.IdRuta,
            datos.IdEmpresa,
            datos.IdConductor,
            datos.Placa,
            datos.NumeroInterno,
            datos.Estado ?? 'Activo'
        ];

        const [resultado] = await pool.execute(sql, valores);

        return this.obtenerPorId(resultado.insertId);
    }

    static async actualizar(id, datos) {
        const sql = `
            UPDATE buseta
            SET IdRuta = ?,
                IdEmpresa = ?,
                IdConductor = ?,
                Placa = ?,
                NumeroInterno = ?,
                Estado = ?
            WHERE IdBuseta = ?
        `;

        const valores = [
            datos.IdRuta,
            datos.IdEmpresa,
            datos.IdConductor,
            datos.Placa,
            datos.NumeroInterno,
            datos.Estado,
            id
        ];

        const [resultado] = await pool.execute(sql, valores);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.obtenerPorId(id);
    }

    static async cambiarEstado(id, estado) {
    const [resultado] = await pool.execute(
        `UPDATE buseta
         SET Estado = ?
         WHERE IdBuseta = ?`,
        [estado, id]
    );

    if (resultado.affectedRows === 0) {
        return null;
    }

    return this.obtenerPorId(id);
}


    }

module.exports = Buseta;