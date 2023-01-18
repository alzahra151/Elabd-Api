const mongoose = require("mongoose")

var ProductSchema = mongoose.Schema({
    
        EnName: { type: String, required: true, toLowerCase: true, trim: true },
        ArName: { type: String, required: true, toLowerCase: true, trim: true },
        Ardiscreption:{ type: String, required: true, toLowerCase: true},
        Endiscreption:{ type: String, required: true, toLowerCase: true},
        Image: { type: String, required: true },
        Amount:{type: Number , default:1},
        Price: { type: Number },
        EnCategories: { type: Array },
        ArCategories: { type: Array },
        NumberOfFav:{type:Number , default:0},
        NumberOfCarts:{type:Number, default:0},


        

},    { timestamps: true })


var Product = mongoose.model("Product", ProductSchema)
module.exports = Product