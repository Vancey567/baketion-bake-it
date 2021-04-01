function extraController(){
    return {
        privacy(req, res){
            res.render('extras/privacy')
        },
        cancellation(req, res){
            res.render('extras/cancellation')
        }
    }
}
module.exports = extraController