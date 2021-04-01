const Seller = require('../../../models/seller')
const bcrypt = require('bcrypt')
const passport = require('passport')

let regex = /^0?[6-9][\d]{9}$/;
function adminregister() {

    // const _getRedirectUrl = (req) => {
    //     return req.user.role === 'admin' ? '/admin/orders' : '/'
    // }

    return{
        login(req, res) {
            res.render('admin/adminlogin')
        },
        postLogin(req, res, next) {
            // validating
            const { email, password } = req.body
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/adminlogin')
            }
            // Login Logic
            passport.authenticate('local', (err, seller, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!seller) {
                    req.flash('error', info.message)
                    return res.redirect('/adminlogin')
                }
                req.login(seller, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },

        sellwithus(req, res) {
            return res.render('admin/sellwithus')
        },
        async storeSeller(req, res) {
            const { name, email, phone, address, story, password, role } = req.body
            // Validate Request
            if (!name || !email || !address || !phone || !story || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                req.flash('phone', phone)
                req.flash('address', address)
                req.flash('story', story)
                // req.flash('password', password)
                return res.redirect('/admin/sellerRegistration')
            } else if(phone.match(regex)) {
                
            }
            else {
                req.flash('error', 'Invalid phone number')
                res.redirect('/admin/sellerRegistration')
            }
            // Check if email exists
            Seller.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    req.flash('story', story)
                    return res.redirect('/admin/sellerRegistration')
                }

            })

            const hashedPassword = await bcrypt.hash(password, 10)

            // Creating user in DB if everything is alright
            const seller = new Seller({
                name: name,
                email: email,
                phone: phone, 
                address: address,
                story: story,
                password: hashedPassword,
                role: role
            })
            seller.save().then((seller) => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/')
            })
        },
    }
}

module.exports = adminregister;