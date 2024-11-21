import { Request, Response } from "express"
import { prisma } from "..";

const createArticle = async(req:Request, res:Response)=>{
    const {title, body, authorId} = req.body;
    try{
        const article = await prisma.article.create({
            data: {title, body, author: {connect: {id: authorId}}}
        });
        res.status(201).json(article);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const getArticles = async(req:Request, res:Response)=>{
    try{
        const articles = await prisma.article.findMany({select: {title: true, body: true,author:true}});
        res.status(201).json(articles);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

export {createArticle, getArticles};