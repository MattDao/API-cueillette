import { Router } from "express";
import PlanteController from "../controllers/PlanteControllers";

const planteRouter = Router(); // Utilisation d'un router
const planteController = new PlanteController(); // nouvelle instance de la class Plantecontroller

planteRouter.get('/', (req, res) => {
    console.log('Planterouter');
    planteController.getAllPlantes(req, res);
});
planteRouter.get("/:id", (req, res) => planteController.getOnePlantById(req, res));
planteRouter.post("/", (req, res) => planteController.createNewPlant(req, res));
planteRouter.put("/:id", (req, res) => planteController.updateOnePlant(req, res));
planteRouter.delete("/:id", (req, res) => planteController.deleteOnePlant(req, res));



export default planteRouter;
