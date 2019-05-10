const express = require("express");

const stripe = require('stripe')('sk_test_PtCrCm27nCrvMIfSNami46BX00okKnz25c');

const bodyParser = require('body-parser');

const exphbs  = require('express-handlebars');

const app = express();

//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static('${__dirname}/public'));
app.use(express.static('public'))

//index route
app.get('/', (req,res) =>{
  res.render('index');
});
//charge route
app.post('/charge', (req, res) =>{
  const amount = 2500;
  stripe.customers.create({
    email:req.body.stripeEmail,
    source:req.body.stripeToken
  })
  .then(customer =>stripe.charges.create({
    amount:amount,
    description:'software development e-book',
    currency:'usd',
    customer:customer.id
  }))
  .then(charge =>res.render('success'));
})

const port = process.env.PORT || 3000;


app.listen(port, () =>{
  console.log('app is listen port ${port}');
})
