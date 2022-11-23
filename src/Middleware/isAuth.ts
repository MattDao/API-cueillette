import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("------------- MiddleWare isAuth ");
  const tokenHeaders = req.headers.authorization;
  console.log("tokenHeaders :", tokenHeaders);

  let token;

  if (tokenHeaders) {
    token = tokenHeaders.split(" ")[1];
    console.log("token :", token);
  }

  if (!token) {
    res.status(401).send({ message: "Token manquant" });
    return;
  }

  let secretKey: string;
  if (process.env.SECRET_KEY_TOKEN) {
    secretKey = process.env.SECRET_KEY_TOKEN;

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      console.log("Err", err);
      console.log("Verify 1", decoded);
      if (!err) {
        next();
      } else {
        res.status(403).send({ message: "le token est FAUX !!!!", error: err });
      }
    });
  } else {
    res.status(500).send({ message: "Contacter le/la dev " });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log("------------- MiddleWare isAdmin ");
  console.log("Tu es admin");
  next();
};
