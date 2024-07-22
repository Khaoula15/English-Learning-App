const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_exoZx45lJdufcZTtX5UDasms00Gfm8KhnV');

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

