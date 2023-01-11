import { Request, Response } from "express";
import User from "../models/User";
import UserService from "../services/UserServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  async getOneUserByEmail(req: Request, res: Response): Promise<void> {
    const paramEmail = req.params.email;
    if (!paramEmail) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'email' can not be empty" },
      });
      return;
    }
    try {
      const oneUser = await this.userService.getOneUserByEmail(paramEmail);
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
        res.status(500).send({ error });
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
    console.log("Usercontroller - connexion - body : ", req.body);
    const connectingUser: User = {
      email: req.body.email,
      password: req.body.password,
    };

    if (
      connectingUser.email === undefined ||
      connectingUser.password === undefined
    ) {
      res
        .status(400)
        .send({ message: "Il manque une info (email ou password)" });
      return;
    }

    // 1 - chercher l'utilisateur dont l'email est présent dans le body
    const foundUser = await this.userService.loginOneUser(connectingUser);
    console.log("foundUser", foundUser);
    if (foundUser.length === 0) {
      console.log("Email non trouvé dans la BDD");
      res
        .status(401)
        .send({ message: "Le couple email/password ne correspondent pas" });
      return;
    }

    // 2 - comparer le mot de passe en clair (BODY) avec celui hashé (BDD)
    bcrypt.compare(
      connectingUser.password,
      foundUser[0].password,
      (err, result) => {
        console.log("err", err);
        console.log("result", result);
        if (result) {
          console.log("Connexion réussie");
          // 3 - si les mdp concordent générer un token
          let secretKey: string;

          if (process.env.SECRET_KEY_TOKEN) {
            secretKey = process.env.SECRET_KEY_TOKEN;

            jwt.sign(
              { sub: foundUser[0].id },
              secretKey,
              { expiresIn: "4h" },
              (err: any, token: string | undefined) => {
                console.log("erro", err);
                console.log("Token ", token);
                console.log("Type Token", typeof token);
                // 4 - renvoyer ce token
                res.status(200).send({
                  token: token,
                  message:
                    "Félicitations voici votre token d'authentification !!!",
                });
              }
            );
          } else {
            res
              .status(500)
              .send({ message: "Merci de contacter votre administrateur" });
          }
        } else {
          res
            .status(401)
            .send({ message: "Le couple email/password ne correspondent pas" });
          return;
        }
      }
    );
  }
}

export default UserController;
