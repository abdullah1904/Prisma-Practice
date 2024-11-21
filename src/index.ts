import { PrismaClient } from "@prisma/client";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { articleRouter } from "./routes/articleRouter";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/user', userRouter)
    .use('/article', articleRouter);

prisma.$connect()
    .then(() => {
        app.listen(8080, () => {
            console.log('App is running on port 8080');
        })
    })
    .catch((err:any) => console.log(err));