const select = require('../model/queries/select');
const insert = require('../model/queries/insert');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
exports.get = (req, res) => {
  select.selectPosts((posts) => {
    if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
      res.redirect("/login");
      // res.render('home', { posts });
      // res.send('whatever! no cookies!!')
    } else {
      const token = cookie.parse(req.headers.cookie).token;
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) res.send('<h1>Why did you play with your cookies, Asshole!<h1>');
        else {
          res.render('home', {
            posts
          });
        }
      });
    }
  });
}
exports.post = (req, res) => {

  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
    res.redirect("/login");
  } else {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) res.send('<h1>Why did you play with your cookies, Asshole!<h1>');

      let {
        body
      } = req.body;
      insert.insertPost(decoded.user_id, body, (err, result) => {
        console.log('the post content is ', body, 'for the user with userId=', decoded.user_id);
        if (err) return new Error(err);
        res.redirect('/');
      })

    });
  }
}
