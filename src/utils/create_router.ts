import { OpenAPIHono } from "@hono/zod-openapi";

const createRouter = (basePath?: string) =>
  new OpenAPIHono({ strict: false }).basePath(basePath ?? "/");

export default createRouter;
