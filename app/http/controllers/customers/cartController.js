const { json } = require("express")
const Menu = require('../../../models/menu')
function cartController() {
    return {
        index (req, res){
          res.render('customers/cart')
        },
        async delete(req, res) {
          // console.log("Session User " + req.session.passport.user)
          // console.log("Session id " + req.session.id)
          // // console.log(req.user.id)
          // console.log("User " + req.user.id)

          const _id = req.params.id;
          // console.log(_id);
          req.session.cart.totalQty -= req.session.cart.items[_id].qty;
          req.session.cart.totalPrice -= req.session.cart.items[_id].item.price * req.session.cart.items[_id].qty;
          
          delete req.session.cart.items[_id];
        
          // console.log(req.session.cart.items);
          res.status(302).redirect('/cart')
        },
        update(req,res){         
          if(req.session.passport.user === req.user.id) {

            // Create cart if theres no cart in the session
            if(!req.session.cart) {
              req.session.cart = {
                items:{},
                totalQty:0,
                totalPrice:0
              }
            }
            let cart = req.session.cart
              
            //check if item does not exist in cart.
            if(!cart.items[req.body._id]){
             cart.items[req.body._id]={
               item:req.body,
               qty:1
             }
             cart.totalQty=cart.totalQty + 1
             cart.totalPrice = cart.totalPrice + req.body.price
            } else { // if item exist in the cart
              cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
              cart.totalQty = cart.totalQty + 1
              cart.totalPrice = cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })

          }
        },
    }
}

module.exports = cartController