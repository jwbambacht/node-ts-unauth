import {
    Controller,
    Get,
    Render,
} from "routing-controllers";
import { Container } from "typedi";
import { LoggerService } from "../services/LoggerService";
import { MailService } from "../services/MailService";

@Controller()
export class RouteController {
    log = Container.get(LoggerService);
    mailer = Container.get(MailService);

    @Get("/")
    @Get("/home")
    @Render("index.ejs")
    GetHome(): unknown {
        return {page: "home"};
    }
}