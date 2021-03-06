// Importing Controller
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const AdminRegisterController = require('../app/http/controllers/admin/adminregister')
const AdminDashController = require('../app/http/controllers/admin/dashController')
const statusController = require('../app/http/controllers/admin/statusController')
const productController = require('../app/http/controllers/product/productController')
const blogController = require('../app/http/controllers/blog/blogController')
const extraController = require('../app/http/controllers/extras/extraController')


// Middlewares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    //Admin Routes
    app.get('/admin/orders', admin, AdminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
    app.get('/admin/sellerRegistration', AdminRegisterController().sellwithus)
    app.post('/admin/sellerRegistration', AdminRegisterController().storeSeller)
    app.get('/adminlogin', guest, AdminRegisterController().login)
    app.post('/adminlogin', AdminRegisterController().postLogin)
    
    
    //extra routes
    app.get('/privacy', extraController().privacy)
    app.get('/cancellation', extraController().cancellation)

    // Blog Routes
    app.get('/blog/cakeblog', blogController().index)
    app.get('/blog/firstblog', blogController().firstblog)
    app.get('/blog/secondblog', blogController().secondblog)

    // Products Routes
    app.get('/product/productDetails/:id', productController().show) // This :id will take you to the specific product whose id is this.id. And this id should be same as you pass it from show method

    // Delete prod
    app.get('/cart/deleteCart/:id', cartController().delete)

    // Dashboard

    // app.get('/dashboard', guest, AdminDashController().editMenu)
    app.get('/dashboard', AdminDashController().adminDash)
    app.get('/dashboard/addMenu', AdminDashController().addMenu)
    // app.post('/addmenu', AdminDashController().postAddMenu)
    // app.post('/dashboard/addMenu', AdminDashController().postAddMenu)
    app.post('/dashboard/addMenu', AdminDashController().postEditProduct)
    app.get('/dashboard/viewMenu', AdminDashController().addOrder)

    // Add new Product
    app.get('/dashboard/addNewProduct', AdminDashController().addNewProduct)
    app.post('/dashboard/addNewProduct', AdminDashController().postAddNewProduct)

    // Delete Product from dashboard
    app.get('/dashboard/deleteprod/:id', AdminDashController().deleteProduct)
    
    // Edit Products from dashboard
    app.get('/dashboard/editproduct/:id', AdminDashController().editProduct)
    // app.put('/addMenu/:id', AdminDashController().postAddMenu)

    app.get('/dashboard/allOrder', AdminDashController().showAllOrders)
    
}

module.exports = initRoutes