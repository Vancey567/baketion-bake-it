const Menu = require('../../../models/menu');

function dashController() {
    return {
        adminDash(req, res) {
            res.render('admin/dashboard');
        },
        addMenu(req, res) {
            res.render('admin/addMenu');
        },
        postAddMenu(req, res) {
            const {prodName, price, size, image, description} = req.body;
            if(!prodName || !price || !size || !image || !description) {
                req.flash('error', "All Fields are required");
                req.flash('prodName', prodName);
                req.flash('price', price);
                req.flash('size', size);
                req.flash('image', image);
                req.flash('description', description);
                res.redirect('/dashboard/addMenu');
            }
            
            const addMenu = new Menu({
                name: prodName,
                image: image,
                price: price,
                size: size,
                description: description
            })
            addMenu.save().then((addMenu) => {
                req.flash('success', 'Product added successfully');
                return res.redirect('/dashboard/addMenu');
            }).catch(error => {
                req.flash('error', 'Something went wrong');
                return res.redirect('/login');
            })
        },
        async addOrder(req, res) {
            const menu = await Menu.find()
            return res.render('admin/addOrder', {menu: menu});
        }
    }
}

module.exports = dashController;