import { config } from "dotenv";
import server from "./src/app.js";
import logger from "./src/config/logger.js";
import ip from "ip";
import sequelize from "./db.js";
import syncModels from "./src/models/syncModels.js";

const currentIp = ip.address();

//env
config();
const { PORT } = process.env;

//funcion para iniciar el servidor

//variables de inicio
const sequelizeForce = true;

async function initServer() {
  try {
    //autenticar sequelize
    await sequelize.authenticate();

    //sincronizar sequelize
    await sequelize.sync({ force: sequelizeForce });
    console.log("Sequelize sincronizado...");

    //sincronizar modelos
    await syncModels();

    //habilitar un puerto http
    server.listen(PORT || 3002, () => {
      //guardar log de inicio exitoso
      logger.info("Servidor activo OK");
      //log del listening
      console.log(`servidor activo en http://${currentIp}:${PORT || 3002}`);
      //log de los modelos para dev...
      console.log(sequelize.models)
    });
  } catch (error) {
    logger.error("Se produjo un error al iniciar el servidor \n", error);
    throw error;
  }
}

//iniciar el servidor.

initServer();
