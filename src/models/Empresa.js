
const db = require('../config/db');

class Empresa {

    // GET: consultar todas las empresas
    static async obtenerTodas() {
        const sql = `
            SELECT IdEmpresa, Nombre, Telefono, Direccion, Estado
            FROM empresa
            ORDER BY IdEmpresa ASC
        `;

        const [filas] = await db.query(sql);
        return filas;
    }

    // GET: consultar una empresa por ID
    static async obtenerPorId(id) {
        const sql = `
            SELECT IdEmpresa, Nombre, Telefono, Direccion, Estado
            FROM empresa
            WHERE IdEmpresa = ?
        `;

        const [filas] = await db.query(sql, [id]);
        return filas[0] || null;
    }

    // POST: registrar una empresa
    static async crear(datos) {
        const sql = `
            INSERT INTO empresa (Nombre, Telefono, Direccion)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            datos.Nombre,
            datos.Telefono || null,
            datos.Direccion || null
        ]);

        return this.obtenerPorId(resultado.insertId);
    }

    // PUT: actualizar los datos de una empresa
    static async actualizar(id, datos) {
        const sql = `
            UPDATE empresa
            SET Nombre = ?, Telefono = ?, Direccion = ?
            WHERE IdEmpresa = ?
        `;

        const [resultado] = await db.query(sql, [
            datos.Nombre,
            datos.Telefono || null,
            datos.Direccion || null,
            id
        ]);

        return resultado;
    }

    // PATCH: cambiar el estado de una empresa
    static async actualizarEstado(id, estado) {
        const sql = `
            UPDATE empresa
            SET Estado = ?
            WHERE IdEmpresa = ?
        `;

        const [resultado] = await db.query(sql, [estado, id]);
        return resultado;
    }
}

module.exports = Empresa;