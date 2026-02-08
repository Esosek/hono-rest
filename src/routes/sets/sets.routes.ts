import { createRoute, z } from "@hono/zod-openapi";
import { SetCodeEnum } from "@/interfaces.js";

const SetSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.enum(SetCodeEnum),
  cardCount: z.number(),
  mechanics: z.array(z.string()),
});

const tags = ["Sets"];

export const list = createRoute({
  tags,
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(SetSchema),
        },
      },
      description: "List all sets",
    },
  },
});

export type IListRoute = typeof list;
