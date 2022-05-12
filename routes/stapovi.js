const express = require('express');
const { sequelize, Rod } = require('../models');
const Joi = require('joi'); 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


  const schema = Joi.object().keys({ 
    salesId: Joi.number().integer().required(),
    brand: Joi.string().min(2).max(20).required(),
    model: Joi.string().min(2).max(20).required(),
    type: Joi.string().min(2).max(20).required(),
    weight: Joi.number().integer().required(),
    price: Joi.number().integer().required(),

  });

route.get('/vratiStapove', (req, res) => {
    Rod.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/dodajStap', (req, res) => {



   const validate = schema.validate(req.body);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

   Rod.create(req.body).then( rows => {
      
        res.status(200).json("True");

    }).catch( err => res.status(500).json("Neuspesno dodavanje stapa!") );
});

route.delete('/obrisiStap', (req, res) => {
    
    Rod.destroy({ where: { id: req.body.id} })
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json("Neuspesno Brisanje Stapa") );
});


route.put('/updateStapa', (req, res) => {
    
    
   const validate = schema.validate(req.body);

   console.log(validate);

   if(validate.error != null){
       console.log(validate.error.details[0].message);
       res.status(400).json(validate.error.details[0].message);
       return;
   }

   Rod.update(
        { 
            amount:req.body.amount,
            type:req.body.type,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            purpose:req.body.purpose

        },
      
        {where: { id: req.body.salesId}} 
    )
        .then( rows => res.json("True") )
        .catch( err => res.status(500).json("Neuspesno menjanje stapa!") );
});


module.exports = route;