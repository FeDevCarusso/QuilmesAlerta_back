import logger from "../config/logger.js";
import AlertSuscription from "./AlertsSuscription.js";
import Incident from "./Incidents.js";
import UserRoles from "./Roles.js";
import User from "./User.js";

export default async function syncModels() {
  try {
    await User.sync();
    await AlertSuscription.sync();
    await Incident.sync();
    await UserRoles.sync()

    console.log("Todos los modelos fueron sincronizados correctamente.");
  } catch (error) {
    logger.error(`Se produjo un error al sincronizar los modelos \n ${error}`);
    throw error;
  }
}
