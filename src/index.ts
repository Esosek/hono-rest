import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";

import setsRouter from "./routes/sets/sets.index.js";
import createRouter from "./create_router.js";

const API_PREFIX = "/api/v1";

const app = createRouter(API_PREFIX);

const routers = [setsRouter];

routers.forEach((router) => app.route("/", router));

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "hono-rest",
  },
});

app.get("/docs", swaggerUI({ url: `${API_PREFIX}/doc` }));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
