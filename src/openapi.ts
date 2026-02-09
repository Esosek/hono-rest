import { swaggerUI } from "@hono/swagger-ui";
import type { OpenAPIHono } from "@hono/zod-openapi";
import config from "./config.js";

export const configureOpenAPI = (app: OpenAPIHono) => {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: config.appVersion,
      title: "hono-rest",
    },
  });

  app.get("/docs", swaggerUI({ url: `${config.apiPrefix}/doc` }));
};
