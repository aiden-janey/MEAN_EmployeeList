const express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

var { Employee } = require('../models/employee');

// => localhost:8080/employees/ 
router.get('/', (req, res) =>{
    Employee.find((err, docs) =>{
        if(!err){ res.send(docs); }
        else{ console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) =>{
    var emp = new Employee({
        name: req.body.name, 
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) =>{
        if(!err){
            res.send(doc);
        }else{ 
            console.log('Error in Employee Save: ' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.put('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);
    
    var emp = {
        name: req.body.name, 
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };

    Employee.findByIdAndUpdate(req.params.id, { $set: emp}, {new: true}, (err, doc) =>{
        if(!err){
            res.send(doc);
        }else{ 
            console.log('Error in Employee Update: ' + JSON.stringify(err, undefined, 2)); 
        }
    });
});


router.delete('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Record w/ Given Id: ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.send(doc);
        }else{ 
            console.log('Error in Employee Delete: ' + JSON.stringify(err, undefined, 2)); 
        }
    });
});

module.exports = router;