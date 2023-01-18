const { find } = require('../Models/Cart')
const Cart = require('../Models/Cart')
const Product = require('../Models/product')
const User = require('../Models/user')
async function addToCart(UserID, RequestData) {

    const newCart = new Cart({
        UserId: UserID,
        ProductID: RequestData.ProductID,
    })
    return newCart.save()
}


async function removeFromCart(cartid) {
    let cartData = await Product.findById(cartid)

    if (cartData == null) {
        return "Incorrect Product Id"

    } else {
        await Cart.findByIdAndDelete(cartid)
        return "Product Deleted Successfuly"
    }
}

async function GetAllCArts(UserID) {
    const user = await User.findById(UserID)
    console.log(user);
    if (user) {
        return await Cart.find({ UserId: UserID })
    }
    else {
        return null
    }

}
module.exports = { addToCart, removeFromCart , GetAllCArts}