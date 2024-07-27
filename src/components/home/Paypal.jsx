import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaypalComponent({ locationName }) {
    const price = 500; // Assuming a static price for demonstration

    function createOrder() {
        return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/social/create-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price: price
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }

    function onApprove(data) {
        console.log("data approved", data);
        return fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/social/capture-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: data.orderID
            })
        })
        .then((response) => response.json())
        .then((orderData) => {
            const name = orderData.payer.name.given_name;
            console.log("orderData", orderData);
            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/social/send-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderData: orderData,
                    locationName: locationName
                })
            })
            alert(`Transaction completed by ${name}`);
        });
    }

    return (
        <PayPalScriptProvider options={{ clientId: "ATIa_S5Be0naaLk2ihI1yKpGXExZKDKKz1enI6xDEc8qCjS_DLajcSOxWjq-ZxmiBTLn4biVDS10MZjH" }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}

export default PaypalComponent;
