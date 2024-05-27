const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const usercontroller = require('./controllers/usercontroller');
const productcontroller =require('./controllers/producontroller')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/upload',express.static('upload'));

app.use('/user', usercontroller);
app.use('/product', productcontroller);



app.listen(3001);