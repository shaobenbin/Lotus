'use strict';

var mongoose = require('mongoose'),
    Modules = mongoose.model('Modules');

exports.save = function (req, res) {
    var modules = new Modules(req.body);
    var owner = req.user.username;
    if(!modules.owner) {
        modules.owner = owner;
    }
    modules.save(function (err) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        } else {
            res.status(200);
            return res.json("success");
        }
    });
};

exports.fetch = function(req,res){

    var projectId = req.body.projectId;
    var organizationName = req.body.organizationName;

    if (!organizationName) {
        organizationName = null;
    }
    var owner = req.user.username;

    Modules.find({projectId:projectId, author:owner}, function(err, modules){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        }else{
            res.status(200);
            return res.send(modules);
        }
    });
};

exports.fetchOfVersion = function(req,res){
    var projectName = req.body.projectName;
    var organizationName = req.body.organizationName;
    if(!organizationName){
        organizationName = null;
    }
    var owner = req.user.username;
    var version = req.body.version;

    Modules.findOne({projectName:projectName,organizationName:organizationName,owner:owner,version:version},function(err,module){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        }else{
            res.status(200);
            return res.send(module);
        }
    });
};