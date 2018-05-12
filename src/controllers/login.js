const select = require('../model/queries/select');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require("cookie");

exports.get = (req, res) => {
  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
    res.render("login");
    // res.send('you are here and supposed to log in!!')
  } else {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) res.render('login');
      else {
        res.redirect("/");
        // res.send('you are already logged in!!')
      }
    });
  }
}

exports.check = (req, res) => {
  const {
    email,
    password
  } = req.body;
  select.selectUsers(email, (cb) => {
    console.log('successful logging user with cb: ', cb);
    if (cb[0]) {
      //check hashed password
      bcrypt.compare(password, cb[0].password, (err, hashedResult) => {
        if (err) return res.status(500);
        if (hashedResult) {
          const token = jwt.sign({
            password,
            username: cb[0].name,
            user_id: cb[0].id,
            logged: true
          }, process.env.SECRET);
          res.cookie("token", token, {
            maxAge: 900000,
            httpOnly: false
          });
          res.redirect('/');
        } else {
          res.send('<h1>Wrong Password!!<h1>')
        }
      })
    } else {
      res.send('<h1>No user with such email!<h1>')
    }
  })
}
