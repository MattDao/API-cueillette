import { Request, Response } from "express";
import Plante from "../models/Plante";
import PlanteService from "../services/PlanteServices"

//Création de classe

class PlanteController {
  private planteService = new PlanteService();

  async getAllPlantes(req: Request, res: Response) {
    console.log("PlanteService");

    try {
      const plantes = await this.planteService.getAllPlantes();
      res.send({ status: "ok", data: plantes });
    } catch (error) {
      res.status(500).send({ status: "failed", message: error });
    }
  }
  async getOnePlantById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const onePlant = await this.planteService.getOnePlantById(id);
      res.send({ status: "OK", data: onePlant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async createNewPlant(req: Request, res: Response): Promise<void> {
    const NewPlant: Plante = {
      ...req.body,
    };
    console.log(NewPlant);
    if (
      !NewPlant.name ||
      NewPlant.unitprice === undefined ||
      NewPlant.quantity === undefined ||
      NewPlant.rating === undefined ||
        NewPlant.url_pic === undefined ||
        )
     {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'power', 'life'",
        },
      });
      return;
    }

    try {
      await this.planteService.createNewPlant(NewPlant);
      res.status(201).send({
        status: "OK",
        message: `New plant created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async updateOnePlant(req: Request, res: Response): Promise<void> {
    const changes: Plante = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.unitprice || !changes.quantity || !changes.unitprice || !changes.url_pic) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request body",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.planteService.updateOnePlant(id, changes);
      res.status(201).send({
        status: 'OK',
        message: `Plant with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }
  async deleteOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.planteService.deleteOnePlant(id);
      res
        .status(200)
        .send({ status: 'OK', message: `Plant with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

}
export default PlanteController;

