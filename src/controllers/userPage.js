const select = require('../model/queries/select');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

exports.get = (req, res) => {
  console.log('i\'m in the userPage');
  const name = req.params.name;
  select.selectUser(name, (cb) => {
    console.log(cb[0]);
    if (!cb[0]) {
      res.status(404).send('<h1>404 no such user<h1>')
    }
    const email = cb[0].email;
    const id = cb[0].id;

    if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
      res.redirect("/login");
    } else {
      const token = cookie.parse(req.headers.cookie).token;
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) res.send('<h1>Why did you play with your cookies, Asshole!<h1>');
        else {
          res.render('userPage', {
            name,
            email,
            id
          });
        }
      });
    }
  });

}
