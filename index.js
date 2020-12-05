const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



// //Middleware 1
// app.use(function(req,res,next){
//     req.myName="Deepak";
//     console.log('middle ware 1 called');
//     next();
// });

// //Middleware 2
// app.use(function(req,res,next){
//     console.log('My name is from MW2:', req.myName);

//     // console.log('middle ware 2 called');
//     next();
// });


var contactList = [
    {
        name: "Deepak",
        phone: "8719888938"
    },
    {
        name: "Tony Stark",
        phone: "9826262714"
    },
    {
        name: "Tushar",
        phone: "9340586657"
    }
]

app.get('/',function(req,res){
    // console.log('From GET route controller',req.myName);
    

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title : "Contacts List",
            contact_List: contacts
        });
    });
    
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us play with EJS"
    });
});

app.post('/create-contact',function(req,res){
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');
});

app.get('/delete-contact',function(req,res){

    //get the id from query in tghe ul
    let id = req.query.id;
    //find the coontact in the db using is and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error is running the server',err);
    }
    console.log('Yup! my Express Server is running on port',port);
});