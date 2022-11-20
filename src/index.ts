import express from "express";
import cors from "cors";
import planteRouter from "./Routes/PlanteRoutes";
import AppDataSource from "./Data-source";
import userRouter from "./Routes/UserRoutes";
import { appendFile } from "fs";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(
      cors({
        origin: "*", // 'http://localhost:3000'
        methods: ["GET", "PUT", "POST", "DELETE"],
      })
    );
    app.use(express.static("./public"));
    app.use("/api/plantes", planteRouter);
    app.use("/api/users", userRouter);
    app.listen(process.env.PORT, () => {
      console.log(
        `L'api est en route sur l'adresse localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Une erreur s'est produite : ", err);
  });

  
