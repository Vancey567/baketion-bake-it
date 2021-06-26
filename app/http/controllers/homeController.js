const Menu = require('../../models/menu');
const Pastry = require('../../models/pastry');

function homeController() {
    return {
        async index(req, res){
            const cakes = await Menu.find() // get all the cakes
            const pastrys = await Pastry.find()
            // console.log(pastrys);
            // console.log(cakes);
            return res.render('home', { cakes : cakes, pastrys: pastrys }) // 1st is key and 2nd is cakes received from database
        }
        
    }
}

module.exports = homeController