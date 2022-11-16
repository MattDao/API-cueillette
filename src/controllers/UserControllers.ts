import { Request, Response } from "express";
import User from "../models/User";
import UserService from "../services/UserServices";

//Création de classe

class UserController {
  private userService = new UserService();

  async getAllUsers(req: Request, res: Response) {
    console.log("UserService");

    try {
      const users = await this.userService.getAllUsers();
      res.send({ status: "ok", data: users });
    } catch (error) {
      res.status(500).send({ status: "failed", message: error });
    }
  }
  async getOneUserById(req: Request, res: Response): Promise<void> {
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
      const oneUser = await this.userService.getOneUserById(id);
      res.send({ status: "OK", data: oneUser });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async createNewUser(req: Request, res: Response): Promise<void> {
    const NewUser: User = {
      ...req.body,
    };
    console.log(NewUser);
    if (!NewUser.email || NewUser.password === undefined) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body",
        },
      });
      return;
    }

    try {
      await this.userService.createNewUser(NewUser);
      res.status(201).send({
        status: "OK",
        message: `New user created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async updateOneUser(req: Request, res: Response): Promise<void> {
    const changes: User = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.email || !changes.password) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.userService.updateOneUser(id, changes);
      res.status(201).send({
        status: "OK",
        message: `User with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async deleteOneUser(req: Request, res: Response): Promise<void> {
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
      await this.userService.deleteOneUser(id);
      res
        .status(200)
        .send({ status: "OK", message: `User with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}
export default UserController;
