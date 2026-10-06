'use strict';
// "!mdbgum" for quickly generate mongoose model schema
const {model, Schema, Types} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop'; // Singular name of the collection your model is for
const COLLECTION_NAME = 'Shops'; // Name of the collection your model is for
// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLength: 150,
        index:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    verified:{
        type:Schema.Types.Boolean,
        default:false
    },
    roles:{
        type:Array,
        default:[]
    }
}, {
    collection: COLLECTION_NAME,
    timestamps:true
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);