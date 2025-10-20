const express = require('express')
const path = require('path')
const fs = require('fs')
const { log } = require('console')
const app = express()

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs') 

app.get("/",(req,res,next)=>{
    fs.readdir("./files",(err,files)=>{
        if(err)
        console.error( "this is error",err.message)
        console.log("this files present is files folder",files)
        res.render("index",{files : files}) 
    })
})

app.post('/create',(req,res)=>{
    if(req)  
        fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`,`${req.body.details}`,(err)=>{
            if(err)
            console.error(err.message);
            else
            res.redirect('/')
                   
        })
})

app.get('/files/:name',(req,res)=>{
    console.log( `${req.params.name}`)
    fs.readFile(`./files/${req.params.name}`,'utf8',(err,data)=>{ 
        if(err)
        console.error(err.message)
        console.log("this is data",data);
        res.render('show',{fileName: `${req.params.name}` ,fileData: `${data}` })
    }) 
})
 
app.get('/edit/:name',(req,res)=>{
    fs.readFile(`./files/${req.params.name}`,'utf8',(err,data)=>{ 
        if(err)
        console.error(err.message)
        console.log("this is data",data);
        res.render('edit',{fileName: `${req.params.name}` ,fileData: `${data}` })
    }) 
})

app.get('/delete/:name',(req,res)=>{
    fs.unlink(`./files/${req.params.name}`,(err)=> {if (err) console.error(err.message)})
    res.redirect('/')    
})

app.post('/save/:name',(req,res)=>{
    console.log( `${req.body.content}`)
    fs.writeFile(`./files/${req.params.name}`,`${req.body.content}`,(err)=> {if (err) console.error(err.message)})
    res.redirect('/')
})
  
app.get('/show',(req,res)=>{
    res.render('show')
})

app.listen(3000,()=> console.log("server started"))