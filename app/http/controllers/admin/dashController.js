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
            const productId = req.params.id;
            console.log(productId);
            const updatedData = JSON.parse(JSON.stringify(req.body));
            console.log(updatedData);

            Menu.updateOne({_id: productId}, {$set: updatedData})
            .then(() => {
                res.send({message: "Product updated successfully"})
            }).catch((err) => {
                res.send({ message: "Something went wrong" });
            })



            // const {prodName, price, size, image, description} = req.body;
            // if(!prodName || !price || !size || !image || !description) {
            //     req.flash('error', "All Fields are required");
            //     req.flash('prodName', prodName);
            //     req.flash('price', price);
            //     req.flash('size', size);
            //     req.flash('image', image);
            //     req.flash('description', description);
            //     res.redirect('/dashboard/addMenu');
            // }
            
            // const addMenu = new Menu({
            //     name: prodName,
            //     image: image,
            //     price: price,
            //     size: size,
            //     description: description
            // })
            // addMenu.save().then((addMenu) => {
            //     req.flash('success', 'Product added successfully');
            //     return res.redirect('/dashboard/addMenu');
            // }).catch(error => {
            //     req.flash('error', 'Something went wrong');
            //     return res.redirect('/login');
            // })
        },
        async addOrder(req, res) {
            const menu = await Menu.find()
            return res.render('admin/addOrder', {menu: menu});
        },

        async deleteProduct(req, res) {
            const productId = req.params.id;
            console.log(productId);
             Menu.deleteOne({_id: productId})
            .then(() => {
                res.status(302).redirect('/dashboard/addOrder');
                // res.send({ message: "Product Deleted"});
            }).catch((err) => {
                console.log(err);
                res.send({message: "Something went wrong"});
            })
        },

        editProduct(req, res) {
            console.log('hey');
            console.log(req.params.id);
            // console.log(req.body);
            res.render('admin/addMenu');
        }
    }
}

module.exports = dashController;