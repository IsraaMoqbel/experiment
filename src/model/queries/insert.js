const connect = require('../db_connect.js')
exports.insertPost=(user_id,body,cb)=>{
  const sql =
  {
    text:'INSERT INTO posts (user_id,body) VALUES ($1,$2) returning user_id',
    values:[user_id,body]
  }
  connect.query(sql,(err,result)=>{
    if(err) return cb(err)
    console.log( 'user has posted a post and the result is: ',result);
    cb(null,result.rows[0].user_id)
  })
}
exports.insertUser=(name,password,email,phone,cb)=>{
  const sql =
  {
    text:'INSERT INTO users (name,password,email,phone) VALUES ($1,$2,$3,$4) ',
    values:[name,password,email,phone]
  }
  connect.query(sql,(err,result)=>{
    if(err) return cb(err)
    cb(null,result)
  })
}
exports.insertComment=(user_id,body,post_id,cb)=>{
  const sql =
  {
    text:'INSERT INTO comments (user_id,body,post_id) VALUES ($1,$2,$3) returning user_id',
    values:[user_id,body,post_id]
  }
  connect.query(sql,(err,result)=>{
    if(err) return cb(err)
    console.log( 'user has commented to a post and the result is: ',result);
    cb(null,result.rows[0].user_id)
  })
}
