import { Request, Response } from "express"
import { prisma } from "..";

const createUser = async(req:Request, res:Response)=>{
    const {name, email} = req.body;
    try{
        const user = await prisma.user.create({
            data: {name,email}
        });
        res.status(201).json(user);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const getUsers = async(req:Request, res:Response)=>{
    try{
        const users = await prisma.user.findMany({include: {articles: true}});
        res.status(201).json(users);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const updateUser = async(req:Request, res:Response)=>{
    const {name} = req.body;
    const {id} = req.params;
    try{
        const user = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name}
        });
        res.status(201).json(user);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const deleteUser = async(req:Request, res:Response)=>{
    const {id} = req.params;
    try{
        const user = await prisma.user.delete({
            where: {id: parseInt(id)}
        });
        res.status(201).json(user);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

export {createUser, getUsers, updateUser,deleteUser};