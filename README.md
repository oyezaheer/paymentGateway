# Simple Checkout with Stripe

This project is a basic e-commerce platform implementing a simple checkout process using Stripe's API. It allows users to browse products, add them to a cart, and make payments securely through Stripe.

## Features

1. **Frontend**:
   - Product listing with mock data.
   - "Add to Cart" functionality.
   - Cart icon displaying the number of selected items.
   - Checkout page with email input and payment details.

2. **Backend**:
   - Orders database to track transactions.
   - Integration with Stripe API for secure payment processing.
   - Webhooks to update payment status in real-time.

3. **Other Highlights**:
   - Modular, reusable code components.
   - Well-documented for easy understanding and maintainability.

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud setup)
- Stripe account for API keys

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/oyezaheer/paymentGateway.git
   cd paymentGateway
   ```
2. Navigate to the client and server directories and install dependencies:
    ```
    cd client
    npm install
    cd ../server
    npm install
    ```
3. Create a .env file in the server directory with the following:
    ```
    PORT=4000
    MONGO_URI=<Your MongoDB URI>
    STRIPE_SECRET_KEY=<Your Stripe Secret Key>
    STRIPE_WEBHOOK_SECRET=<Your Stripe Webhook Secret>
    ```
4. Start the development server: 
- Backend : 
  ```
  cd server
  node server.js
  ```
- Frontend : 
  ```
  cd client
  npm start
  ```
5. Open the application in your browser at http://localhost:3000

## Webhook Setup
1. Install the Stripe CLI : 
    ```
    stripe login
    ```
2. Forward webhooks : 
    ```
    stripe listen --forward-to localhost:4000/webhook
    ```

## Testing the Application
### Add products to the cart, proceed to checkout, and make a payment using the Stripe test card:
- Card Number: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits 

    
