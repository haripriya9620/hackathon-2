import React from 'react';
import axios from "axios";
import Success from './Success';
// import Error from './Error';

class Payment extends React.Component {

  state = { status: false };

  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.subtotal,
      status: false
    };
    this.openPayModal = this.openPayModal.bind(this);
  }

  rerender = () => {
    console.log("Entered rerender function finally....",this.state.status)
    this.setState(currentState => {
      return { status: true };
    });
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }

  openPayModal(amt) {
    console.log("Status before call:", this.state.status)
    var amount = amt * 100; //Razorpay consider the amount in paise
    var options = {
      "key": "rzp_test_yrdCJAubXRm4Ga",
      "amount": 0, // 2000 paise = INR 20, amount in paisa
      "name": "",
      "description": "",
      'order_id': "",
      "handler": function (response) {
        console.log(response);
        var values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: amount,
        }
        axios.post(`http://localhost:8000/razorpay/${amount}`)
          .then(this.rerender)
          .catch(err => {
            console.log("Throwing back the exception", err)
          })
      },
      "theme": {
        "color": "#FF0000"
      }
    };
    axios.post(`http://localhost:8000/razorpay/${amount}`)
      .then(res => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        console.log(options)
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch(e => console.log(e))
  };

  render() {
    return (
      <div>
        {console.log("in div", this.state.status)}
        {this.state.status === true && <Success success="Your Order Placed Successfully" />}
        {/* {this.state.error === true && <Error error="Something went wrongs" />} */}

        <button className='btn' onClick={(e) => { this.openPayModal(this.state.amount) }}>Pay Now</button>
      </div>
    );
  }

}
export default Payment;