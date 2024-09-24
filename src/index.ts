import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import useApiRoutes from "./routes/api";
import connectDB from "./configs/mongo";

connectDB();

const app = new Elysia().use(
  swagger({
    documentation: {
      info: {
        title: "Bun Elysia API Documentation",
        version: "1.0.0",
      },
    },
  })
);

useApiRoutes(app);

app.listen(3006);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
