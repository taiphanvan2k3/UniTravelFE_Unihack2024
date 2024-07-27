import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";

PaypalComponent.propTypes = {
    locationName: PropTypes.string,
    totalPrice: PropTypes.number,
    childCount: PropTypes.number,
    childPrice: PropTypes.number,
    adultCount: PropTypes.number,
    adultPrice: PropTypes.number,
    date: PropTypes.string,
};

function PaypalComponent({ locationName, totalPrice, childCount, childPrice, adultCount, adultPrice, date }) {
    localStorage.setItem(
        "paypalObj",
        JSON.stringify({ locationName, totalPrice, childCount, childPrice, adultCount, adultPrice, date })
    );
    async function createOrder() {
        console.log(JSON.parse(localStorage.getItem("paypalObj")));
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/social/create-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price: JSON.parse(localStorage.getItem("paypalObj")).totalPrice,
            }),
        });
        const order = await response.json();
        return order.id;
    }

    async function onApprove(data) {
        console.log("data approved", data);
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/social/capture-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: data.orderID,
            }),
        });
        const orderData = await response.json();
        const name = orderData.payer.name.given_name;
        const { totalPrice, childCount, childPrice, adultCount, adultPrice, locationName, date } = JSON.parse(
            localStorage.getItem("paypalObj")
        );
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/social/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderData: orderData,
                locationName: locationName,
                availableDate: date,
                totalPrice: totalPrice,
                tickets: [
                    { ticketType: "Child", quantity: childCount, price: childPrice },
                    { ticketType: "Adult", quantity: adultCount, price: adultPrice },
                ],
            }),
        });
        alert(`Transaction completed by ${name}`);
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: "ATIa_S5Be0naaLk2ihI1yKpGXExZKDKKz1enI6xDEc8qCjS_DLajcSOxWjq-ZxmiBTLn4biVDS10MZjH",
            }}
        >
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
}

export default PaypalComponent;
