import { serve } from "@hono/node-server";

import setsRouter from "./routes/sets/sets.index.js";
import createRouter from "./create_router.js";
import { configureOpenAPI } from "./openapi.js";
import config from "./config.js";

const app = createRouter(config.apiPrefix);

const routers = [setsRouter];

routers.forEach((router) => app.route("/", router));

configureOpenAPI(app);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
