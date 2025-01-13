const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;



// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

// Stripe Webhook
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const Order = require("./models/Order");

        await Order.findOneAndUpdate(
          { stripePaymentIntentId: session.payment_intent },
          { status: "paid" }
        );
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
