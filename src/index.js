const express= require('express');
const mongoose= require('mongoose');
const route= require('./routes/route')
const app=express();

app.use(express.json());

mongoose.connect("mongodb+srv://soniyayy:Soniya123@cluster0.ltjt0u7.mongodb.net/group7Database")
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
