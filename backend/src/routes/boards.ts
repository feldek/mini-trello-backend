import { type Response } from "express";
import { Board } from "../../db/models/boards";
import { type IAuthReq } from "./auth";

interface ICreateBoard extends IAuthReq {
  body: { name: string; id: string; };
}

interface IDeleteBoard extends IAuthReq {
  body: { id: string; };
}

export const boardRepository = {
  async getBoards(req: IAuthReq, res: Response) {
    try {
      const currentBoards = await Board.findAll({
        where: { userId: req.user.id },
        attributes: ["name", "id"],
        raw: true,
      });
      res.status(201).json(currentBoards);
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },

  async createBoard(req: ICreateBoard, res: Response) {
    try {
      await Board.create({
        userId: req.user.id,
        name: req.body.name,
        id: req.body.id,
      });
      res.status(201).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },

  async deleteBoard(req: IDeleteBoard, res: Response) {
    try {
      await Board.destroy({ where: { id: req.body.id } });
      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },
};
