const express = require("express");

const Pizza = require('./models/pizzaModel')

const app = express();
const db = require("./db.js")
const cors = require("cors");
const shortid = require("shortid");
const Razorpay = require("razorpay");
app.use(express.json());
const path = require('path')
const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

const razorpay = new Razorpay({
    key_id: 'rzp_test_yrdCJAubXRm4Ga',
    key_secret: 'O7TcY7bZ2bdu9GzLp4u1SKSn',
});

app.use(cors());
app.use('/api/pizzas/', pizzasRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute)

app.post('/razorpay/:amount', async (req, res) => {
    console.log("request received",req.params.amount)
    const payment_capture = 1;
    const amount = req.params.amount;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.log(error);
    }
});


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))

    })
}

const port = process.env.PORT || 8000;

app.listen(port, () => `Server running on port port 🔥`)