const app = require('./app.js');
app.listen(app.get('port'), ()=>{
  console.log(`You are listening to port ${app.get('port')}`)
})
