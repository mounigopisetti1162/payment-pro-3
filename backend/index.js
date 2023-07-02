const express = require('express')
const cors = require('cors')
const dotenv=require('dotenv')
// import * as dotenv from 'dotenv'
var bodyParser = require('body-parser')
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const rolesController = require('./controllers/roleController')
const paymentController = require('./controllers/paymentController')

const auth = require('./middleware/auth')
dotenv.config() 
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = require('./db')



app.post('/add-product', auth.checkToken, productController.addProduct)
app.get('/get-products', auth.checkToken, productController.getProducts)
app.post('/edit-products', auth.checkToken, productController.editProduct)
app.get('/get-product/:id', auth.checkToken, productController.getProductById)
app.post('/delete-products', productController.deleteProducts)

app.post('/signup', userController.signUp)
app.post('/login', userController.login)
app.post('/add-to-cart', auth.checkToken, userController.addToCart)
app.post('/get-user-cart', auth.checkToken, userController.getCart)

app.post('/add-role', auth.checkToken, rolesController.addRole)
app.post('/delete-role', auth.checkToken, rolesController.deleteRole)

app.post('/orders', paymentController.orders)
app.post('/verify', paymentController.verfiy)
const PORT=process.env.PORT||4000

app.get('/',function(request,responce)
{
    responce.send("this the payment backend")
})
app.listen(PORT, () => {
    console.log('Shopping backend Running...')
})
