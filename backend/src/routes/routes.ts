import { Router } from "express";
import { authenticateToken } from "../middewares/authMiddleware/authMiddleware";
import { refreshTokensAuth } from "../middewares/authMiddleware/token";
import { geoPlugin, weatherPlugin } from "./api/weatherplugin";
import { userRepository as user } from "./auth";
import { boardRepository as board } from "./boards";
import { fileRoutes } from "./fileRoute";
import { listRepository as list } from "./lists";
import { taskRepository as task } from "./tasks";

const router = Router();

router.get("/", [(req, res) => res.status(200).json({ result: "true", root: "asd" })]);
router.get("/health-check", [(req, res) => res.status(200).json({ result: "true" })]);
router.post("/auth/signUp", [(req, res) => user.signUp(req, res)]);
router.get("/auth/fetchUser", [authenticateToken, (req, res) => user.fetchUser(req, res)]);
router.post("/auth/signIn", [(req, res) => user.signIn(req, res)]);
router.post("/auth/recoveryPassword", [(req, res) => user.generateRecoveryLink(req, res)]);
router.get("/auth/recoveryPassword/link/:token", [(req, res) => user.recoveryPassword(req, res)]);
router.post(
  "/auth/changePassword",
  [
    authenticateToken,
    (req, res) => user.changePassword(req, res),
  ],
);
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

router.use("/files", fileRoutes);

export default router;
