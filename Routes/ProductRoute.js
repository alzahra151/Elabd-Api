const router = require('express').Router()
const {VerfiyAdmin} = require('../Controlers/Auth')
const { AddNewProduct, UpdateProduct, GetAllProducts, GetProductById, DeletProducById ,GetProductsStats } = require('../Controlers/productControlers')

router.post("/", VerfiyAdmin, async function (request, response, next) {
   try {
      const NewProduct = await AddNewProduct(request.body)
      response.status(200).json(NewProduct)
   }
   catch (err) {
      response.status(500).json(err.message)
   }
})

router.put("/:id", VerfiyAdmin, async function (request, response, next) {
   try {
      const UpdatedProduct = await UpdateProduct(request.params.id, request.body)
      if (UpdatedProduct) {
         response.status(200).json(UpdatedProduct)
      } else {
         response.status(401).json("InCorrrect Product ID")
      }
   }
   catch (error) {
      response.status(401).json(error.message)
   }
})

router.get("/:id", async function (request, response, next) {
   try {
      const ProductData = await GetProductById(request.params.id)
      if (ProductData) {
         response.status(200).json(ProductData)
      } else {
         response.status(401).json("InCorrrect Product ID")
      }
   }
   catch (error) {
      response.status(401).json(error.message)
   }
})
router.get("/", async function (request, response, next) {
   try {
      let limit = request.query.limit || 10
      let skip = request.query.skip || 0
      let EnName = request.query.EnName 
      let ArName = request.query.ArName 
      let price = request.query.price
      let EnCategories=request.query.EnCategories
      let ArCategories=request.query.ArCategories
      let latestProducts=request.query.latestProducts
      let oldestProducts=request.query.oldestProducts
      let Products = await GetAllProducts(skip, limit ,EnName,ArName,price,EnCategories,ArCategories,latestProducts,oldestProducts)
      response.status(200).json(Products)
   }
   catch (err) {
      response.status(401).json(err.message)
   }
})

router.delete("/:id", VerfiyAdmin, async function (request, response, next) {

   try {
      const DeletMessag = await DeletProducById(request.params.id)
      response.status(200).json(DeletMessag)

   } catch (err) {
      response.status(401).json(err.message)
   }
})

router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {
   try {
      const data = await GetProductsStats()
      response.status(200).json(data)
  }
  catch (error) {
      response.status(401).json(error.message)
  }
})
module.exports = router