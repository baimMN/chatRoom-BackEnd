const db=require('mongoose')
const schema=db.Schema

const user=new schema({
	name:String,
	email:String,
	password:String,
})


const chats=new schema({
	ownerId:String,
    time:String,
    ownerName:String,
    message:String
})

exports.user=db.model('user',user);
exports.chats=db.model('chats',chats);