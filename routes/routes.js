const express = require("express");
const { users } = require("./users");
const { boards } = require("./boards");
const { lists } = require("./lists");
const router = express.Router();

router.post("/users/signUp", async (req, res) => users.signUp(req, res));
router.post("/users/signIn", async (req, res) => users.signIn(req, res));
router.post("/users/recoveryPassword", async (req, res) =>
  users.recoveryPassword(req, res)
);
router.post("/users/changePassword", async (req, res) => users.changePassword(req, res));
router.get("/users/confirmEmail/:uuid", async (req, res) => users.confirmEmail(req, res));

router.get("/boards/getBoards", async (req, res) => boards.getBoards(req, res));
router.post("/boards/createBoard", async (req, res) => boards.createBoard(req, res));
router.delete("/boards/deleteBoard", async (req, res) => boards.deleteBoard(req, res));

router.get("/lists/getAllLists", async (req, res) => lists.getAllLists(req, res));
router.get("/lists/getCurrentLists", async (req, res) => lists.getCurrentLists(req, res));
router.post("/lists/createList", async (req, res) => lists.createList(req, res));
router.delete("/lists/deleteList", async (req, res) => lists.deleteList(req, res));

module.exports = router;
