import mongoose  from 'mongoose';

const CTASchema = new mongoose.Schema({
    location:{
        type:{
            type: String,
            required: true,
            default: 'Feature'
        },
        properties:{
            Name:{
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            
            begin:{
                type: Date,
                required: true,
                default: null
            },
            end:{
                type: Date,
                required: true,
                default: null
            },
            altitudeMode:{
                type: String,
                required: true,
                default: 'absolute'
            },
            tessellate:{
                type: Number,
                required: true,
                default: 1
            },
            extrude:{
                type: Number,
                required: true,
                default: 0
            },
            visibility:{
                type: Number,
                required: true,
                default: 1
            },
            drawOrder:{
                type: String,
                required: true,
                default: ''
            },
            icon:{
                type: String,
                required: true,
                default: ''
            },
            comment:{
                type: String,
                required: true,
                default: ''
            },
            class:{
                type: String,
                required: true
            },
            alts:{
                type:String,
                required: true,
                default:""
            },
            schedule:{
                type:String,
                required: true,
                default:""
            },
            state:{
                type:String,
                required: true,
                default:""
            },
            definition:{
                type:String,
                required: true,
                default:""
            },
            subtype:{
                type:String,
                required: true,
                default:""
            },
            src:{
                type:String,
                required: true,
                default:""
            },
            freq:{
                type:String,
                required: true,
                default:""
            },
            phone:{
                type:String,
                required: true,
                default:""
            },
            index:{
                type:String,
                required: true,
                default:""
            },
            at:{
                type:String,
                required: true,
                default:""
            },
            area:{
                type:String,
                required: true,
                default:""
            },
            airac:{
                type:String,
                required: true,
                default:""
            }
        }
    }
});
export default mongoose.model('ControlTrafficArea', CTASchema);