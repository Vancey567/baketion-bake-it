const Menu = require('../../../models/menu')


function productController() {
    return {
        async show(req, res) {
            const _id = req.params.id;
            let cake = await Menu.findById(_id);
            res.render('product/productDetails', {cake: cake});
        },
        
    }
}

module.exports = productController