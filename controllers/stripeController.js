const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "inr",
    description: "Your transaction description here", // Provide a description for the transaction as per Stripe documentation
    receipt_email: "customer@example.com", // Provide the customer's email address
    shipping: {
      name: "abc",
      address: {
        line1: "xyz",
        city: "City", // Provide the city information
        postal_code: "Postal Code", // Provide the postal code information
        country: "IN", // Provide the country code for India (IN)
      },
    },
  });

  console.log(paymentIntent);

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
