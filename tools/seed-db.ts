import dotenv from "dotenv";
import { Container } from "typedi";
import { LoggerService } from "../src/services/LoggerService";
import { getConnectionOptions, createConnection, useContainer } from "typeorm";

const logger = Container.get(LoggerService);

useContainer(Container);
dotenv.config();

/**
 * Add test users to the database
 */
async function seedDB(): Promise<void> {
    this.logger.info("Seeding database...");
}

/**
 * Setup typeORM connection with the database (postgres)
 */
async function setupTypeORM(): Promise<void> {
    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: process.env.TYPEORM_CONNECTION, // See createConnection options for valid types
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: process.env.TYPEORM_SYNCHRONIZE,
        logging: process.env.TYPEORM_LOGGING,
        entities: [__dirname + "/../src/models/*.ts"],
    });

    await createConnection(connectionOptions);
}

setupTypeORM().then(() => {
    logger.info("Connected to db!");

    seedDB().then(() => {
        logger.info("Done seeding the db!");
    });

}).catch((e) => {
    logger.error("Db connection failed with error: " + e);
});