import {Router} from "express";
import { getExpenseByCategory } from "../controllers/expensesController";

const router = Router();

router.get("/", getExpenseByCategory);

export default router;