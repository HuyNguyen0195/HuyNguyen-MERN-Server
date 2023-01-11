const express = require('express');
const apiRoutes = express.Router();
const db = require('./mongoConnect');
const collectionName = 'cars';
apiRoutes.route('/').get(async function(req,res){
    const dbCluster = db.getDb();
    const mySort = {make:1};
    dbCluster.collection(collectionName).find({}).sort(mySort).limit(50).toArray(function(err, result){
        if(err) {
            res.status(400).send('Error fetching data');
        } else {
            res.json(result)
            //console.log(result);
        }
    })
})

apiRoutes.route('/post').post(async function(req,res){
    const dbCluster = db.getDb();
    const listing = {
        make: req.body.make,
        model: req.body.model,
    }
    dbCluster.collection(collectionName).insertOne(listing, function(err, result){
        if(err) {
            res.status(400).send(`Error inserting listing ${listing} `);
        } else {
            res.status(204).send();
        }
    })
})

apiRoutes.route('/delete').delete(async function(req,res){
    const dbCluster = db.getDb();
    const listing = {model: req.body.model};
    dbCluster.collection(collectionName).deleteOne(listing, function(err, result){
        if(err) {
            res.status(400).send(`Error deleting listing ${listing} `);
        } else {
            res.status(204).send();
        }
    })
})

module.exports = apiRoutes;