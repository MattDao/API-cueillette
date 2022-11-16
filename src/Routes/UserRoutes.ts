import { Router } from "express";
import UserController from "../controllers/UserControllers";

const userRouter = Router(); // Utilisation d'un router
const userController = new UserController(); // nouvelle instance de la class userController

userRouter.get("/", (req, res) => userController.getAllUsers(req, res));
userRouter.get("/:id", (req, res) => userController.getOneUserById(req, res));
userRouter.post("/", (req, res) => userController.createNewUser(req, res));
userRouter.put("/:id", (req, res) => userController.updateOneUser(req, res));
userRouter.delete("/:id", (req, res) => userController.deleteOneUser(req, res));

export default userRouter;
