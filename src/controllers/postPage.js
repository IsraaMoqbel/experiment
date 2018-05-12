const select = require('../model/queries/select');
const insert = require('../model/queries/insert');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

exports.get = (req, res) => {
  console.log('i\'m in the postPage');
  const post_id = req.params.id;
  select.selectPost(post_id, (cb) => {
    console.log(cb[0]);
    if (!cb[0]) {
      res.status(404).send('<h1>404 no such post!<h1>')
    }
    if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
      res.redirect("/login");
    } else {
      const token = cookie.parse(req.headers.cookie).token;
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) res.send('<h1>Why did you play with your cookies, Asshole!<h1>');
        else {
          select.selectComments(post_id,(cb1)=>{
            console.log('select comments',cb1[0]);
            const comments=cb1;
            res.render('postPage',{postBody:cb[0].body,user:cb[0].name, post_id, comments:comments});

          })
        }
      });
    }
  });

}

exports.post = (req, res) => {
  const post_id=req.params.id;
  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
    res.redirect("/login");
  } else {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) res.send('<h1>Eat your cookies!<h1>');
      let {
        body
      } = req.body;
      select.selectPost(post_id, (cb) => {
        if (!cb[0]) {
          res.status(404).send('<h1>404 no such post!<h1>')
        }
        if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
          res.redirect("/login");
        } else {
          const token = cookie.parse(req.headers.cookie).token;
          jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) res.send('<h1>Why did you play with your cookies, Asshole!<h1>');
            else {
              insert.insertComment(decoded.user_id, body,post_id, (err, result) => {
                console.log('the comment content is ', body, 'for the user with userId=', decoded.user_id ,'post_id', post_id);
                if (err) return new Error(err);
                console.log(decoded);
                res.redirect('/'+decoded.username+'/'+post_id)
              })
            }
          });
        }
      });

    });
  }
}
