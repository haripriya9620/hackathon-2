import React, { useEffect } from 'react'
import { useSelector } from "react-redux";


function Checkout({ subtotal }) {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });

    return (

        <div>
            {currentUser ? (
                <button type="button" onClick={() => displayRazorpay({ subtotal })} className="btn">Pay Now</button>
            ) : (
                <button className="btn">Login to Pay</button>
            )}
        </div>

    )
}

async function displayRazorpay(subtotal) {
    let payTotal = subtotal.subtotal;
    console.log(subtotal.subtotal);
    const options = {
        key: 'rzp_test_yrdCJAubXRm4Ga',
        currency: 'INR',
        amount: payTotal * 100
    }
    const responseJson = await fetch(`http://localhost:8000/razorpay/${payTotal}`, {
        method: "POST",
    }).then((t) => t.json());

    console.log(responseJson);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

export default Checkout
