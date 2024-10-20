import { conn } from "../../../../libs/db";
import { NextResponse } from "next/server";

// FUNCION PARA OPTENER UN USUARIO
export async function GET(request, { params }) {
  try {
    const result = await conn.query(`
      SELECT
        usuarios.us_id,
        usuarios.us_nombres,
        usuarios.us_apellidos,
        usuarios.us_usuario,
        usuarios.us_correo,
        generos.gen_id,
        generos.gen_descripcion,
        roles.rol_id,
        roles.rol_descripcion,
        estados.es_id,
        estados.es_descripcion
      FROM
        usuarios
      JOIN
        generos ON usuarios.us_genero_id = generos.gen_id
      JOIN
        roles ON usuarios.us_rol_id = roles.rol_id
      JOIN
        estados ON usuarios.us_estado_id = estados.es_id
      WHERE
        usuarios.us_id = ?
    `, [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
        message: "Usuario No Entontrado",
        }, {
        status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    }, {
      status: 500,
    })
  }
}

// FUNCION PARA EDITAR UN USUARIO
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE usuarios SET ? WHERE us_id = ?", [
      data,
      params.id
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario No Encontrado",
        }, {
          status: 404,
        }
      );
    }

    const updatedUser = await conn.query("SELECT * FROM usuarios WHERE us_id = ?", [
      params.id,
    ]);

    return NextResponse.json({message: "Se Edito Correctamente"});
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    }, {
      status: 500,
    });
  }
}