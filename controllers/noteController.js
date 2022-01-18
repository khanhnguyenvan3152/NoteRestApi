const noteCollection = require('../models/notes')
const userCollection = require('../models/users')
const getAll = async (req,res,next)=>{
    const notes = noteCollection.find({});
    res.status(200).json({notes})
}

const getNote = async (req,res,next)=>{
    const noteId = req.params.noteId
    const note = await noteCollection.findById(noteId)
    res.status(200).json({success:true,note})
}

const deleteNote = async (req,res,next)=>{
    const noteId = req.params.noteId
    try{
        await noteCollection.findByIdAndDelete(noteId)
        res.status(200).json({success:true})
    }catch(err){
        console.log(err)
        res.status(400),json({success:false,error:err})
    }
}

const updateNote = async (req,res,next)=>{
    const noteId = req.params.noteId
    let {title,content,light,dark} = req.body
    try{
        let note = await noteCollection.findById(noteId)
        note.title = title
        note.content = content
        note.light = light
        note.dark = dark
        let result = await note.save()
        res.status(200).json({success:true,note:result})
    }catch(err){
        console.log(err)
        res.status(200).json({success:false,error:err})
    }
}

const addNote = async (req,res,next)=>{
    let {userId,title,content,light,dark} = req.body
    try{
        let user = await userCollection.findById(userId)
        let newNote = new noteCollection()
        newNote.title = title
        newNote.content = content
        newNote.color.light = light
        newNote.color.dark = dark
        newNote.owner = userId
        await newNote.save()
        user.notes.push(newNote._id)
        await user.save()
        return res.status(200).json({success:true,note:newNote})
    }catch(err){
        console.log(err)
        res.status(400).json({success:false,message:'An error occured'})
    }
}
module.exports = {getNote,getAll,deleteNote,updateNote,addNote}