import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router()

router.post('/',  createUser)


router.put('/:id',  updateUser)


router.delete('/:id',  deleteUser)


router.get('/:id',getUser)


router.get('/',  getUsers)
export default router;

