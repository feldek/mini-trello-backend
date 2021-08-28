import { userRepository as user } from "./auth";
import { boardRepository as board } from "./boards";
import { listRepository as list } from "./lists";
import { taskRepository as task } from "./tasks";
import { geoPlugin, weatherPlugin } from "./api/weatherplugin";
import { Router } from "express";
import { authenticateToken } from "./auth/authMiddleware";
import { refreshTokensAuth } from "./auth/token";
import { filesRepository as files } from "./files";

const router = Router();

router.post("/auth/signUp", [(req, res) => user.signUp(req, res)]);
router.post("/auth/signIn", [(req, res) => user.signIn(req, res)]);
router.post("/auth/recoveryPassword", [(req, res) => user.generateRecoveryLink(req, res)]);
router.get("/auth/recoveryPassword/link/:token", [(req, res) => user.recoveryPassword(req, res)]);
router.post("/auth/changePassword", [
  authenticateToken,
  (req, res) => user.changePassword(req, res),
]);
router.post("/auth/refreshTokensAuth", [(req, res) => refreshTokensAuth(req, res)]);
router.get("/auth/confirmEmail/:confirmToken", [(req, res) => user.confirmEmail(req, res)]);

router.get("/boards", [authenticateToken, (req, res) => board.getBoards(req, res)]);
router.post("/board", [authenticateToken, (req, res) => board.createBoard(req, res)]);
router.delete("/board", [authenticateToken, (req, res) => board.deleteBoard(req, res)]);

router.get("/lists", [authenticateToken, (req, res) => list.getLists(req, res)]);
router.post("/lists", [authenticateToken, (req, res) => list.createLists(req, res)]);
router.delete("/list", [authenticateToken, (req, res) => list.deleteList(req, res)]);

router.get("/tasks", [authenticateToken, (req, res) => task.getTasks(req, res)]);
router.post("/tasks", [authenticateToken, (req, res) => task.createTasks(req, res)]);
router.patch("/task", [authenticateToken, (req, res) => task.updateTask(req, res)]);
router.delete("/task", [authenticateToken, (req, res) => task.deleteTask(req, res)]);

router.get("/api/geoplugin", [authenticateToken, geoPlugin]);
router.get("/api/weatherplugin", [authenticateToken, weatherPlugin]);

router.get("/files/:folder/:fileName", [(req, res) => files.getFile(req, res)]);

router.get("/test", (req, res) => {
  res.status(200).json({ test: "json" });
});


export default router;
