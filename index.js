const { Pool } = require("pg");

const config = {
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "always_music",
};

const pool = new Pool(config);

const argumentos = process.argv.slice(2);

const funcion = argumentos[0];

const nombre = argumentos[1];
const rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

const getEstudiantes = async () => {
  const res = await pool.query("SELECT * FROM estudiantes");
  console.log("Registro actual", res.rows);
};

const consultaRut = async (rut) => {
  const res = await pool.query(`SELECT * FROM estudiantes WHERE rut='${rut}'`);
  console.log(res.rows);
};

const nuevoEstudiante = async (nombre, rut, curso, nivel) => {
  await pool.query(
    `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}')`
  );
  console.log(`Estudiante ${nombre} agregado con éxito`);
};

const editEstudiantes = async (nombre, rut, curso, nivel) => {
  await pool.query(
    `UPDATE estudiantes SET nombre='${nombre}', curso='${curso}', nivel='${nivel}' WHERE rut = '${rut}'`
  );
  console.log(`Estudiante ${nombre} editado con éxito`);
};

const eliminarEstudiante = async (rut) => {
  await pool.query(`DELETE FROM estudiantes WHERE rut = '${rut}'`);
  console.log(`Registro de estudiante con rut ${rut} eliminado`);
};

const funciones = {
  consulta: getEstudiantes,
  rut: consultaRut,
  nuevo: nuevoEstudiante,
  editar: editEstudiantes,
  eliminar: eliminarEstudiante,
};

(async () => {
  if (funcion === "rut") {
    await funciones[funcion](rut);
  } else if (funcion === "nuevo" || funcion === "editar") {
    await funciones[funcion](nombre, rut, curso, nivel);
  } else {
    await funciones[funcion](rut);
  }
  pool.end();
})();

//node index.js nuevo "Diego Baeza" "17661091-1" "Flauta" "Básico"
//node index.js consulta
//node index.js rut "17666091-1"
//node index.js editar "Diego Baeza" "17661091-1" "Flauta" "Intermedio"
//node index.js eliminar "17661091-1"
