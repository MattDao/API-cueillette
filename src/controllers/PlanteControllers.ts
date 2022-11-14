import { Request, Response } from "express";
import PlanteService from "../services/PlanteServices"

//Création de classe

class PlanteController {
private planteService = new PlanteService();

async getAllPlantes(req: Request, res: Response) {
    console.log('PlanteService');

    try {
        const plantes = await this.planteService.getAllPlantes();
        res.send({ status: "ok", data: plantes });
}   catch (error) {
    res.status(500).send({ status: "failed", message: error});
}
}
}
export default PlanteController;

