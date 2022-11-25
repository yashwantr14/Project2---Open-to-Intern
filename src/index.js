const express= require('express');
const mongoose= require('mongoose');
const route= require('./routes/route')
const app=express();
const multer=require('multer')

app.use(express.json());
app.use(multer().any())

mongoose.connect("mongodb+srv://yashwantr_14:Yashu_1410@cluster0.uic9809.mongodb.net/group40Database")
.then(function(){
    console.log("MongoDb is Connected")
})

.catch(function(errors){
      console.log({errors:errors.message})
})

app.use('/', route);

app.listen(process.env.PORT || 3001, function(){
    console.log("Express app running on port " + 3001 || process.env.PORT )
})
