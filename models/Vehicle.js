var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {type:String, required:true},
  targ: { type:String, required:true},
  user: { type:String }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

TodoSchema.virtual('busy')
  .get(function () {
    return this.user!=='';
  })
  .set(function(busy){
    if (busy)
      this.set('user', '');
  });

module.exports = mongoose.model('Vehicle', TodoSchema);
