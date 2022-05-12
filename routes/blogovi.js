const express = require('express');
const { sequelize, Blog } = require('../models');
require('dotenv').config();
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object().keys({ 
    userId: Joi.number().integer().required(),
    topic: Joi.string().min(5).max(20).required(),
    title: Joi.string().min(5).max(20).required(),
    body: Joi.string().min(20).max(250).required(),
    conclusion: Joi.string().min(15).max(70).required(),
    authorContact: Joi.string().min(3).max(20).required(),
            

  });

route.get('/vratiBlogove', (req, res) => {
    Blog.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/dodajBlog', (req, res) => {



   const validate = schema.validate(req.body);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

    Blog.create(req.body).then( rows => {
      
        res.status(200).json("True");

    }).catch( err => res.status(500).json("Neuspesno dodavanje bloga!") );
});

route.delete('/obrisiBlog', (req, res) => {
    
    Blog.destroy({ where: { id: req.body.id} })
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json(err) );
});


route.put('/updateBloga', (req, res) => {
    
    
   const validate = schema.validate(req.body);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

    Blog.update(
        { 
            topic:req.body.topic,
            title:req.body.title,
            body:req.body.body,
            conclusion:req.body.conclusion,
            authorContact:req.body.authorContact

        },
      
        {where: { id: req.body.userId}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json("Neuspesno menjanje bloga!") );
});


module.exports = route;