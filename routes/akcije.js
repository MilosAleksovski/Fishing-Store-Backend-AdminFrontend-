const express = require('express');
const { sequelize, Sale } = require('../models');
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const schema = Joi.object().keys({ 
    amount: Joi.number().integer().required(),
    type: Joi.string().min(5).max(20).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    purpose: Joi.string().min(3).max(20).required(),

  });

  const schemaUpdate = Joi.object().keys({ 
    id: Joi.number().integer().required(),
    amount: Joi.number().integer().required(),
    type: Joi.string().min(5).max(20).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    purpose: Joi.string().min(3).max(20).required(),

  });

route.get('/vratiAkcije', (req, res) => {
    Sale.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/dodajAkciju', (req, res) => {



   const validate = schema.validate(req.body);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

   Sale.create(req.body).then( rows => {
      
        res.status(200).json("True");

    }).catch( err => res.status(500).json("Neuspesno dodavanje akcije!") );
});

route.delete('/obrisiAkciju', (req, res) => {
    
    Sale.destroy({ where: { id: req.body.id} })
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json(err) );
});


route.put('/updateAkcije', (req, res) => {
    
    
   const validate = schemaUpdate.validate(req.body);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

    Sale.update(
        { 
            amount:req.body.amount,
            type:req.body.type,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            purpose:req.body.purpose

        },
      
        {where: { id: req.body.id}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json("Neuspesno menjanje akcije!") );
});


module.exports = route;