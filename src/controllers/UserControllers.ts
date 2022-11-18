import { Request, Response } from "express";
import User from "../models/User";
import UserService from "../services/UserServices";
import bcrypt from "bcrypt";

// hasher le password avant de l'envoyer dans la base de données

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
  async signInNewUser(req: Request, res: Response) {
    bcrypt
      .hash(req.body.password, 10) //salt=10 combien de fois sera exécuté l'algoritme de hachage;
      .then(async (hash) => {
        console.log(hash);

        const newUser: User = {
          email: req.body.email,
          password: hash,
        };

        if (newUser.email === undefined || newUser.password === undefined) {
          res.status(400).send({
            status: "FAILED",
            data: {
              error:
                "L'une des clés suivantes est manquante ou vide dans le req.body: 'email', 'password'",
            },
          });
          return;
        }

        try {
          await this.userService.signInNewUser(newUser);
          res.status(200).send({
            status: "OK",
            message: `Bienvenue !!!!`,
            data: newUser,
          });
        } catch (error: any) {
          res.send({ message: error?.message });
        }
      })
      .catch((error: any) => {
        res.status(500).json({ error });
      });
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
  async loginOneUser(req: Request, res: Response) {
    const user = await this.userService.loginOneUser(req.body);
    console.log("user récupéré : ", user);
    const passwordUser = user[0].password;
    console.log("password : ", passwordUser);
    const passwordMatch = await bcrypt.compare(req.body.password, passwordUser);
    console.log("password : ", passwordMatch);
    res.send();

    if (user[0].email === undefined || user[0].password === undefined) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: "Saisie manquante",
        },
      });
      return;
    } else if (!passwordMatch) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: "Mot de passe incorrecte",
        },
      });
      return;
    }
  }
}

export default UserController;
