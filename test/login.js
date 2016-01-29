// var superagent = require('superagent');
// var agent = superagent.agent();

// var theAccount = {
//   'userName': 'tds@tds.com',
//   'password': 'tds'
// };

// exports.login = function(request, done){
//       request
//         .post('/auth/getToken/')
//         .send(theAccount)
//         .end(function(err,res){
//           if(err) throw err;
//           agent.saveCookies(res)
//           done(agent)
//         })
//     };

//     