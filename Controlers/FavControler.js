
const Fav = require('../Models/Fav')
const Product = require('../Models/product')
const User = require('../Models/user')
async function addFav(UserID, RequestData) {

    const newFav = new Fav({
        UserId: UserID,
        ProductID: RequestData.ProductID,
    })
    const storedProduct = await Product.findById(RequestData.ProductID)
    await Product.findByIdAndUpdate(RequestData.ProductID,{$set:{"NumberOfFav":storedProduct.NumberOfFav+1}})
    return newFav.save()
  
}


async function removeFromFav(cartid) {
    let FavData = await Product.findById(cartid)

    if (FavData == null) {
        return "Incorrect Product Id"

    } else {
        await Fav.findByIdAndDelete(cartid)
        return "Product Deleted Successfuly"
    }
}

async function GetAllFav(UserID) {
    const user = await User.findById(UserID)

    if (user) {
        return await Fav.find({ UserId: UserID })
    }
    else {
        return null
    }

}
module.exports = { addFav, removeFromFav , GetAllFav}