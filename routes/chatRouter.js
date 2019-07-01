var express = require('express');
var router = express.Router();
const db=require('../model/chatModel.js')
const {user}=db
const chat=db.chats
const expressjwt=require('express-jwt')
const jwt=require('jsonwebtoken')


router.post('/login', async function(req, res, next) {
	const {email,password}=req.body
	const output=user.findOne({email,password},async(err,data) => {  
    	if(!data){res.send({msg:false})}
    	else{
    		const token=await jwt.sign({email:email},'l04u0s7d9fs3')
            const tokens={token:token}
            res.send({...tokens,...data})
    	}
    })
});

router.post('/sendChat',async(req,res)=> {
    const {message,ownerId,ownerName}=req.body
    const hour=new Date().getHours()
    const min=new Date().getMinutes()
    const time=hour+'.'+min
    let newChat=new chat({
        message,
        ownerId,
        time,
        ownerName
    })
    let a=await newChat.save()
    res.send(a)
})

router.get('/allChat',async(req,res)=> {
    let allChat=await chat.find()
    res.send(allChat)
})

router.get('/test',(req,res)=> {
    user.find({},(err,data)=> {
        res.send(data)
    })
})

router.post('/addUser',async(req,res) => {
    const {name,email,password}=req.body
    console.log("name",req.body.name)
    let newUser= new user({
        name,
        email,
        password
    })
    let a=await newUser.save()
    res.send(a)
})

router.delete('/delete',async(req,res)=> {
    const {_id}=req.body
    chat.findOneAndDelete({_id},(err,data) => {
        if(err){res.send({msg:'gagal kiirm'})}
        else {
            res.send({msg:'berhasil hapus'})
        }
    })
})

router.delete('/delall',(req,res)=> {
    chat.deleteMany({},()=> {
        res.send('succes')
    })
})

module.exports = router;
