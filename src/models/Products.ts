import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description: {
        type : String,
        required : true,
        trim : true,
        minLength : 32
    },
    price : {
        type : Number,
        required : true,
        min : [1, 'Price must be greater than zero']
    },
    stock : {
        type : Number,
        required : true,
        min : [0, 'Stock cannot be less than zero']
    },
    images: {
        type: [String],
        validate: {
          validator: function (arr: string[]) {
            return arr.length > 0;
          },
          message: "At least one image is required",
        },
        required: true,
    },
    gender: {
        type : String,
        enum : ['men','women'],
        required : true
    },
    categories: {
        type : String,
        enum : ['ankle fit','slim fit','relaxed fit','straight fit'],
        required : true
    },
    favorites : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},{timestamps: true})

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)