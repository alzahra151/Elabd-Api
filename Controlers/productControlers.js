const Product =require('../Models/product')

async function AddNewProduct(RequestData){
    const newProduct= new Product({
        EnName :RequestData.EnName,
        ArName :RequestData.ArName,
        Image :RequestData.Image,
        Amount :RequestData.Amount,
        Price :RequestData.Price,
        EnCategories :RequestData.EnCategories,
        ArCategories :RequestData.ArCategories,

        

    })
    console.log(newProduct);
 return newProduct.save()
}

async function UpdateProduct(ProductId ,Data){
    return await Product.findByIdAndUpdate(ProductId, { $set: Data, }, { new: true, runValidators: true })
}

async function GetAllProducts(skip, limit ,EnName,ArName,minprice,maxprice,EnCategories,ArCategories,latestProducts,oldestProducts){
    if(skip){
        return await Product.find().skip(skip).limit(limit)
    }
    if(EnName){
        return await Product.find({EnName:EnName})
    }
    if(ArName){
        return await Product.find({ArName:ArName})
    }
    if (minprice){
            return await Product.find({Price:{ $gte: minprice }})  
    }
    if (maxprice){
        return await Product.find({Price:{$lte:maxprice}})  
}
    if(ArCategories){
        return await Product.find({ EnCategories: { $in: [ArCategories] } })
    }
    if(EnCategories){
        return await Product.find({ EnCategories: { $in: [EnCategories] } })
    }
    if (latestProducts){
        return await Product.find().sort({ createdAt: -1 }).limit(5)
    }
    if (oldestProducts){
        return await Product.find().sort({ createdAt: 1 }).limit(5)
    }
    else{
        return await Product.find()
    }
}

async function GetProductById(ProductId){
    return await Product.findById(ProductId)
}

async function DeletProducById(ProductId){
   let ProductData= await Product.findById(ProductId)
    if(ProductData == null){
        console.log(ProductData)
        return "Incorrect Product Id"
        
    }else{
        await Product.deleteOne(ProductData)
        return "Product Deleted Successfuly"
    }
}

async function GetProductsStats() {
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await Product.aggregate([
        {
            $match: { createdAt: { $gte: LastYear } }
        },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: { _id: "$month", total: { $sum: 1 } }
        }

    ])

}
module.exports={AddNewProduct,UpdateProduct,GetAllProducts ,GetProductById ,DeletProducById ,GetProductsStats}