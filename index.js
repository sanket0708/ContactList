const express = require('express');
const path = require('path');
const { ppid } = require('process');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

/* Middleware 1
app.use(function(req,res,next){
    req.myName = "ninjas";
    //console.log('Middleware 1 called');
    next();

});

//Middleware 2

app.use(function(req,res,next){
    console.log('My Name from mw2', req.myName);
    //console.log('Middleware 2 called');
    next();
});*/

var contactList = [
    {
        name:"Ankit",
        phone:"9837465778"
    },
    {
        name:"Susan",
        phone:"8376777452"
    },
    {
        name:"Dino",
        phone:"8329758452"
    }
]



app.get('/',function(req,res){
   // console.log('from the get route controller',req.myName);

    Contact.find({}, function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{ 
            title:"My Contact List",
            contact_list : contacts
        });

    });


  
});

app.get('/practice',function(req,res){

    return res.render('practice',{
        title: "Let us play with ejs"

    });
});


app.post('/create-contact',function(req,res){

   /*contactList.push({
       name : req.body.name ,
       phone : req.body.phone
   });*/

  // contactList.push(req.body);

   Contact.create({
       name: req.body.name,
       phone:req.body.phone
   }, function(err,newContact){
        if(err){console.log('error in creating a contact!'); 
        return;}


        console.log('******',newContact);
        return res.redirect('back');

   });

  

});

app.get('/delete-contact', function(req, res){
    //get the id from query in the url 

    let id = req.query.id;

    //find the contact in db using id and delete it
    
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from db');
            return;
        }

        return res.redirect('back');
    });

   

    
});



app.listen(port,function(err){
   if(err){console.log('Error in running the server',err);}

   console.log('Yup!My express server is working on port:',port);
});