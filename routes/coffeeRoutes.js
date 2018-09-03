const express = require ('express');
const router = express.Router();
const Coffee = require('../models/Coffee')
const mongoose = require('mongoose');

/* ALL the coffees */
router.get('/coffees', async (req,res,next) => {
    try{
        const coffees = await Coffee.find()
        res.status(200).json(coffees);
    } catch(error){
        res.status(500)
        next(error)
    }
})

/* ADD a coffee */
router.post('/coffees',  async (req,res,next) => {

        const {brand, name, specs, description, origin} = req.body
        const newCoffee =  new Coffee ({brand, name, specs, description, origin}) 
       try{
        const coffee  = await newCoffee.save()
        res.status(200).json({'message':'OK','id':coffee._id})
       } catch(error){
           res.status(500)
            next(error)
       }     
})
/* FIND a coffee */
router.get('/coffees/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }
    Coffee.findById(req.params.id)
    .then(coffee => {
        res.status(200).json(coffee)
    })
    .catch(error => {
        res.status(500)
        next(error)
    })
})

/* UPDATE a coffee */
router.put('/coffees/:id', (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    const updates = {
      brand: req.body.brand,
      name: req.body.name,
      specs: req.body.specs,
      description: req.body.description,
      origin: req.body.origin
    };
  
    Coffee.findByIdAndUpdate(req.params.id, updates, {new: true})
    .then(coffee => {
      res.json({
        message: 'Coffee updated successfully'
      });
    }) 
    .catch(error => next(error))     
  })

/* DELETE a Coffee. */

router.delete('/coffees/:id', (req,res,next) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Coffee.remove({_id: req.params.id})
      .then(message => {
          return res.json({ message:'Coffee has been removed!!'
        })
      })
      .catch(error => {
          res.status(500)
          next(error)
      })
})

module.exports = router;