const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");

// Checkout Route
router.post("/checkout", async (req, res) => {
    try {
        const { email, items } = req.body;

        // Validate request
        if (!email || !items || !items.length) {
            return res.status(400).json({ 
                error: "Email and items are required" 
            });
        }

        // Calculate total amount
        const totalAmount = items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: { 
                        name: item.name,
                        description: item.description || undefined
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents and ensure integer
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/failure",
            customer_email: email,
            payment_intent_data: {
                metadata: {
                    email,
                    order_items: JSON.stringify(items)
                }
            }
        });

        // Create order in database
        const order = new Order({
            email,
            items,
            totalAmount,
            stripePaymentIntentId: session.payment_intent || session.id,
            status: 'pending'
        });
        
        await order.save();

        // Return success response
        res.status(200).json({ 
            url: session.url,
            sessionId: session.id,
            orderId: order._id
        });

    } catch (error) {
        console.error("Checkout Error:", error);
        
        // Send appropriate error response
        if (error.type === 'StripeCardError') {
            res.status(400).json({ error: error.message });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Invalid order data' });
        } else {
            res.status(500).json({ error: 'An error occurred during checkout' });
        }
    }
});

// Get order status
router.get("/order/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .select('-__v');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;