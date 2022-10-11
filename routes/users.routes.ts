import { Router } from "express";
const verify = require("../middlewares/verify.middleware");
const router = Router();

const { register, getMyUsername, update, getMyAvatar, deleteUser } = require("../controllers/users.controller");

router.post("/auth/register", register);

router.get("/users/getMyUsername", verify,  getMyUsername);

router.get("/users/getMyAvatar", verify,  getMyAvatar);

router.post("/users/update", verify, update)

router.delete("/users/deleteUser", verify, deleteUser)

module.exports = router;
