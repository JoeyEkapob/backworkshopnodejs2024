const express =require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();

function chacksingin(req , res , next) {
  
    try{
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization']
        const result = jwt.verify(token,secret)
      
        if(result != undefined){
            next();
        }
    }catch (e){
        
        res.status(500).send({ error : e.message})

    }
} 

 function getuserid(req,res){
    try{
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization']
        const result = jwt.verify(token,secret)

        if(result !=undefined){
        return result.id
        }
    }catch (e){
        console.log('21321321')
        res.status(500).send({ error : e.message})

    }
}    



app.post('/signin', async (req,res) => {
    try {
  /*   console.log("User: ", req.body.user);
        console.log("Pass: ", req.body.pass); 
        console.log("status: ", req.body.status);  */
        if(req.body.user == undefined || req.body.pass == undefined){
            return res.status(401).send('unauthorized')
        }
        const user = await prisma.users.findFirst({
            select: {
                id: true,
                name: true,
                pass:true
            },
            where: {
                username: req.body.user,
                pass: req.body.pass,
                status: 'use'
            }
        });
       
       
        
       if (user != undefined){
        console.log(user);
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret ,{expiresIn: '30d'});
            return res.send({token: token})
        } 

    res.status(401).send({ message: 'unauthorized'})

    }catch (e){
        console.error("Error: ", error);
        res.status(500).send({ error : e.message})
    }
})
app.get('/info', chacksingin ,async (req,res,next) =>{
    try{
        const userid = getuserid(req, res);
        const user = await prisma.users.findFirst({
            select:{
                name:true
                
            },
            where:{
                id:userid
            }
        })
   
        res.send({result:user})
    }catch (e){
      
        res.status(500).send({ error : e.message})

    }
})
module.exports = app;