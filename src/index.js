const express= require('express');
const mongoose= require('mongoose');
const route= require('./routes/route')
const app=express();

app.use(express.json());

mongoose.connect("mongodb+srv://ShubhamChaturvedi:9555047172@mongodbwithshubham.z3dowao.mongodb.net/group41Database")
.then(function(){
    console.log("MongoDb is Connected")
})

.catch(function(errors){
      console.log({errors:errors.message})
})

app.use('/', route);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running on port " + 3000 || process.env.PORT )
})
