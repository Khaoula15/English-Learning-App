<template>
  <div class="payment">
    <h1>{{ $t('payment') }}</h1>
    <p>{{ $t('paymentInstructions') }}</p>
    <form @submit.prevent="handlePayment">
      <div class="form-group">
        <label for="name">{{ $t('name') }}</label>
        <input v-model="customerName" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">{{ $t('email') }}</label>
        <input v-model="customerEmail" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="card-element">{{ $t('cardInformation') }}</label>
        <div id="card-element"></div>
      </div>
      <button type="submit">{{ $t('pay') }}</button>
    </form>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
  name: 'PaymentView',
  data() {
    return {
      stripe: null,
      cardElement: null,
      clientSecret: '',
      customerName: '',
      customerEmail: ''
    };
  },
  async mounted() {
    this.stripe = await loadStripe('pk_test_yKqDCWSJ9b2hJZPM2j0vLzVI00WlFYZoiU'); // Replace with your publishable key
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
    await this.createPaymentIntent();
  },
  methods: {
    async createPaymentIntent() {
      try {
        const response = await this.$http.post('/api/payments/create-payment-intent', {
          amount: 1000 // Example amount in cents
        });
        this.clientSecret = response.data.clientSecret;
        if (!this.clientSecret) {
          throw new Error('Failed to get client secret from the server.');
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    },
    async handlePayment() {
      try {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              name: this.customerName,
              email: this.customerEmail
            }
          }
        });

        if (error) {
          console.error('Payment error:', error);
        } else if (paymentIntent.status === 'succeeded') {
          console.log('Payment successful!');
          this.$router.push('/lessons/3');
        }
      } catch (error) {
        console.error('Error handling payment:', error);
      }
    }
  }
};
</script>

<style scoped>
.payment {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#card-element {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>

