import mongoose from 'mongoose';

const AirportSchema=new mongoose.Schema({
  
    location:{
      type:{
        type:String,
        default:"Feature",
        required:true
      },
      properties:{
        name:{
          type:String,
          required:true
        },
        code:{
          type:String,
          required:true
        },
      },
      geometry:{
        type:{
          type:String,
          default:"Point",
          required:true
        },
        coordinates:{
          type:[Number],
          index:"2dsphere",
          required:true
        }
      }
    }
  
  
})
export default mongoose.model('Airport',AirportSchema);