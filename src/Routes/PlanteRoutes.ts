import { Router } from "express";
import PlanteController from "../controllers/PlanteControllers";

const planteRouter = Router(); // Utilisation d'un router
const planteController = new PlanteController(); // nouvelle instance de la class Plantecontroller

planteRouter.get('/', (req, res) => {
    console.log('Planterouter');
    planteController.getAllPlantes(req, res);
});

export default planteRouter;
