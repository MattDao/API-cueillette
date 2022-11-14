import express from "express";
import cors from "cors";
import planteRouter from "./Routes/PlanteRoutes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // 'http://localhost:3000'
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.use('api/plantes', planteRouter);

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
 