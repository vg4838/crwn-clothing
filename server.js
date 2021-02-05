const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
const port = 5000 || process.env.port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount, 
        currency: 'usd'
    }

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr});
        }
        else{
            res.status(200).send({success: stripeRes});
        }
    })
})

app.listen(port, error => {
    if (error)
        throw error;
    console.log('Server running on port '+port)
});