const express = require('express');
const router = express.Router();
const stripe = require('stripe')('pk_test_yKqDCWSJ9b2hJZPM2j0vLzVI00WlFYZoiU');

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

