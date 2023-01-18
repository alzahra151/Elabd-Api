
const Order = require('../Models/order')
const User = require('../Models/user')
const Product = require('../Models/product')

async function CreateOrder(UserID, OrderData) {
            const NewOrder = new Order({
                UserId: UserID,
                Products: OrderData.Products,
                Address: OrderData.Address
            })
            
    const storedProduct = await Product.findById(RequestData.ProductID)
    await Product.findByIdAndUpdate(RequestData.ProductID,{$set:{"NumberOfCarts":storedProduct.NumberOfCarts+1}})
            return await NewOrder.save()
    
}


async function UpdateOrder(OrderID,userID,data) {
    const order= await Order.findById(OrderID)
    if(order){
        if(order.UserId.toString() === userID){
            return await Order.findByIdAndUpdate(OrderID, { $set: data, }, { new: true, runValidators: true })
        }
    }}

async function GetAllOrders(Qnew,name) {
    if (Qnew) {
        return await Order.find().sort({ createdAt: -1 }).limit(5)
    }
    else if(name){
        const user= await User.findOne({FirstName:name})
        if(user){
            return await Order.find({UserId:user.id})
        }
    }
    else {
        return await Order.find()
    }
}

async function GetOrderByID(OrderID) {
    return await Order.findById(OrderID)
}

async function DeletOrder(OrderID, UserID) {
    const order = await Order.findOne({ _id: OrderID})

    const order2= await Order.findOne({ UserId: UserID })
    if (order == null) {

        return " InCorrect ProductID "
    }
    else if(order2 == null){

        return " Product Not Yours So you Can't Delete"
    }
    else {
        
        await Order.findOneAndDelete({ _id: OrderID, UserId: UserID })

        return "User Has Been Deleted"
    }
}

async function GetOrderStats(){
    const date = new Date()
    const LastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const PriviousMonth = new Date(date.setMonth(LastMonth.getMonth() - 1))

    return await Order.aggregate([
        {
            $match: { createdAt: { $gte: PriviousMonth } }
        },
        {
            $project: {
                month: { $month: "$createdAt" },
                selas:"$Amount"
            }
        },
        {
            $group: { _id: "$month", total: { $sum: "$selas" } }
        }

    ])
     
}


module.exports = { CreateOrder, UpdateOrder, GetAllOrders, GetOrderByID, DeletOrder ,GetOrderStats}