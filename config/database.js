module.exports = function(env){
  switch(env){
    case 'local':
      return{
        'url': 'mongodb://localhost:27017/MyMusic',
         options : {
           useMongoClient: true
         }
      }
  }
}

//SET NODE_ENV=local
