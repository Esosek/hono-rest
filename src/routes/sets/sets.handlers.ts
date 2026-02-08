import type { RouteHandler } from "@hono/zod-openapi";
import type { IListRoute } from "./sets.routes.js";
import { sets } from "@/data/sets.js";

export const list: RouteHandler<IListRoute> = async (c) => c.json(sets, 200);
