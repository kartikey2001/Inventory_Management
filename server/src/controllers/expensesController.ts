
import { Request , Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpenseByCategory = async (req:Request , res: Response): Promise<void> => {
    try {
        const expenseByCategory = await prisma.expenseByCategory.findMany(
            {
                orderBy:{
                    date: "desc"
                },
            }
        );
        const expenseByCategorySummary = expenseByCategory.map((item) => ({
            ...item,
            amount: item.amount.toString()
        })
        );
        res.status(200).json(expenseByCategorySummary);
    } catch (error) {
        res.status(500).json({message: "Error fetching expences"});
    }
}