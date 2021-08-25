import { AuthReq } from "./auth";
import { Board } from "../db/models/boards";
import { List } from "../db/models/lists";
import { Response } from "express";

interface IGetList extends AuthReq {
  query: { boardId: string };
}
interface ICreateLists extends AuthReq {
  body: { lists: { name: string; boarsId: string; id: string }[] };
}
interface IDeleteList extends AuthReq {
  body: { id: string };
}

export const listRepository = {
  async getLists(req: IGetList, res: Response) {
    try {
      let search;
      if (req.query.boardId) {
        search = { where: { boardId: req.query.boardId } };
      } else {
        search = {
          include: {
            attributes: [],
            model: Board,
            where: { userId: req.user.id },
          },
        };
      }
      const lists = await List.findAll({
        ...search,
        raw: true,
        attributes: ["name", "id", "boardId"],
      });

      res.status(200).json(lists);
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },

  async createLists(req: ICreateLists, res: Response) {
    try {
      await List.bulkCreate(req.body.lists);

      res.status(201).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },

  async deleteList(req: IDeleteList, res: Response) {
    try {
      await List.destroy({ where: { id: req.body.id } });
      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },
};
