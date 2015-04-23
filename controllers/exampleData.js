var mongoose = require('mongoose');
var Vehicles = require('../models/Vehicle.js');

var GenerateData = function(){
  var auto = ['audi','fiat','mercedes','scoda','toyota'];
  var alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';
  var users = ['carlo','federico','luca','stefano','gesu','', '', '', '',''];

  //console.log('generate');
  Vehicles.remove({},function(err,data){

  });
  for (var i=0; i<50; i++){
    var name = auto[Math.floor(Math.random()*(auto.length-1))]+'_'+Math.floor(Math.random()*49+1);
    var targ = generateTarg();
    var user = users[Math.floor(Math.random()*(users.length-1))];
    console.log('name: '+name+' targ: '+targ+' user: '+user);
    Vehicles.create({
      name: name,
      targ: targ,
      user: user
    },function(){

    });
  }

  function generateTarg(){
    var ris='';
    for(var i=0;i<6;i++)
      ris+=alphabet[Math.floor(Math.random()*(alphabet.length-1))];
    return ris;
  }
};

module.exports = GenerateData;
