import dotenv from "dotenv";
import "reflect-metadata";
import { Container } from "typedi";
import { setupTypeORM } from "./typeORMLoader";
import { useContainer } from "typeorm";
import { LoggerService } from "./services/LoggerService";
import { setupExpressApp } from "./expressLoader";

// Set up the typeorm and typedi integration
useContainer(Container);

// Initialise the dotenv environment
dotenv.config();

// Obtain logger from container
const logger = Container.get(LoggerService);

// Run express application when database has connected successfully
setupTypeORM().then(() => {
    setupExpressApp(logger);
}).catch((e) => {
    logger.error("Database connection failed, exiting application...");
    logger.error(e);
    process.exit(0);
});