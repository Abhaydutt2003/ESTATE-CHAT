import prisma from "../lib/prisma.js";

export const getChats = async(req,res)=>{
    const tokenUserId = req.userId;

    try{
        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[tokenUserId],
                }
            }
        });
        for(const chat of chats){
            const recieverId = chat.userIDs.find((id)=>id !== tokenUserId);
            const reciever = await prisma.user.findUnique({
                where:{
                    id:recieverId,
                },
                select:{
                    id:true,
                    username:true,
                    avatar:true           
                }
            });
            chat.reciever = reciever;
        }
        return res.status(200).json({status:"success",message:"fetched all the chats",chats});
    }catch(error){
        return res.status(500).json({status:"error",message:"error fetching all the chats!"});
    }
}


export const getChat = async(req,res)=>{
    const tokenUserId = req.userId;
    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:'asc',
                    }
                }
            }
        });
        await prisma.chat.update({
            where:{
                id:req.params.id
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        });
        return res.status(200).json({status:"success",message:"Fetched the chat successfully",chat});
    }catch(error){
        return res.status(500).json({status:"error",message:"error fetching the chat!"});
    }
}



export const addChat = async(req,res)=>{
    const tokenUserId = req.userId;
    try{
        const newChat = await prisma.chat.create({
            data:{
                userIDs:[tokenUserId,req.body.recieverId],
            }
        });
        res.status(200).json({status:'success',message:"Created new chat !",newChat});
    }catch(error){
        console.log(error);
        return res.status(500).json({status:"error",message:"Failed to add chat!"});
    }
}



export const readChat = async(req,res)=>{
    const tokenUserId = req.userId;
    try{
        const chat = await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId],
                },
            },
            data:{
                seenBy:{
                    set:[tokenUserId]
                }
            }
        });
        return res.status(200).json({status:'success',message:"Read the chat successfully!",chat});
    }catch(error){
        console.log(error);
        return res.status(500).json({status:"error",message:"Failed to read the chat"});
    }
}