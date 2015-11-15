var express = require('express');
var router = express.Router();
var Account = require("../models/account.js");
var passport = require("passport");
var sess = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session
  res.render('index', { title: 'Express' });
});
router.get("/login", function(req,res){
    if(sess.passport) { 
      console.log(sess)
      res.redirect("/"); 
    } else {
      res.render("index/login.hbs", {sess: sess});
    }
});
router.post('/login',passport.authenticate("local"), function(req, res, next) {
	res.redirect("/");
});

router.get("/register", function(req,res){
      if(sess.passport) { 
      res.redirect("/"); 
    } else {
      res.render("index/register.hbs", {sess: sess});
    }
})
router.post("/register", function(req,res){
	Account.register(new Account({username: req.body.username}), req.body.password, function(err, account){
		if(err) { return res.render("index/register.hbs",{account: account}) }

		passport.authenticate("local")(req,res, function(){
		  console.log(sess);
			res.redirect("/");
		})
	} )
});
router.get("/logout",function(req, res, next) {
  delete req.session.passport;
  
    res.redirect("/");
})

module.exports = router;
