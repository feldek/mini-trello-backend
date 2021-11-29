import { AuthReq } from "./auth";
import { Task } from "../../db/models/tasks";
import { List } from "../../db/models/lists";
import { Board } from "../../db/models/boards";
import { Response } from "express";

interface IGetTasks extends AuthReq {
  query: { boardId: string };
}
interface ICreateTasks extends AuthReq {
  body: {
    tasks: { name: string; id: string; order: number; description: string; listId: string }[];
  };
}
interface IUpdateTask extends AuthReq {
  body: {
    id: string;
    order: number;
    listId: string;
    description: string;
  };
}
interface IDeleteTask extends AuthReq {
  body: { id: string };
}

export const taskRepository = {
  async getTasks(req: IGetTasks, res: Response) {
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
      const tasks = await Task.findAll({
        include: {
          attributes: [],
          model: List,
          ...search,
        },
        attributes: ["name", "id", "order", "description", "listId"],
        raw: true,
      });

      res.status(200).json(tasks);
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },

  async createTasks(req: ICreateTasks, res: Response): Promise<void> {
    try {
      await Task.bulkCreate(req.body.tasks);
      res.status(201).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },

  async updateTask(req: IUpdateTask, res: Response) {
    try {
      const updateTask = await Task.update(
        {
          order: req.body.order,
          listId: req.body.listId,
          description: req.body.description,
        },
        { where: { id: req.body.id } },
      );
      console.log("tasks.updateTask:", updateTask);
      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },
  async deleteTask(req: IDeleteTask, res: Response) {
    try {
      await Task.destroy({ where: { id: req.body.id } });
      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json({});
    }
  },
};
