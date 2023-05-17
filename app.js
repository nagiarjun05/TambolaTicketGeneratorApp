const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const path=require('path');
const sequelize =require('./util/database')

const dotenv=require('dotenv');
dotenv.config();

app.use(cors());


// console.log(process.env.DB_NAME)
const userRoutes=require('./routes/user');
const ticketRoutes=require('./routes/ticket');

// app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/ticket',ticketRoutes);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `views/${req.url}`))
});


sequelize
.sync()
// .sync({force: true})
.then(()=>{
    app.listen(8080)
})
.catch(err=>console.log(err))