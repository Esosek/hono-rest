import createRouter from "@/create_router.js";
import * as routes from "./sets.routes.js";
import * as handlers from "./sets.handlers.js";

const setsRouter = createRouter("/sets").openapi(routes.list, handlers.list);

export default setsRouter;
