const insert = require('../model/queries/insert');
const bcrypt = require('bcrypt');
const cookie =require('cookie');
const jwt = require('jsonwebtoken');

exports.get=(req,res)=>{
  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
      res.render("signup");
    } else {
      const token = cookie.parse(req.headers.cookie).token;
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) res.send('<h1>Why did you play with your cookies, Asshole!<h1>');
        else {
          res.redirect("/");
        }
      });
    }
}

exports.post=(req,res)=>{
const {name,password,email,phone}= req.body;
console.log(name,password,email,phone);
  bcrypt.hash(password, 8, (hashError, hash)=>{
    if(hashError) res.status(500);
    insert.insertUser(name.trim(),hash,email.trim(),phone, cb=>{
  })
  console.log('Succeded inserting user!');
    res.redirect("/login");
})


}
