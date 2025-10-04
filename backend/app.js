const express = require("express");
const app = express();
const products = require("./data/products");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log("Server Started at 8000");
})

app.get('/', (req, res) => {
    res.send("Hello I am Root");
})

app.get('/products', (req, res) => {
    res.json(products);
})

app.post("/checkout", (req, res) => {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    console.log("Checkout cart received:", cart);

    return res.json({ message: "Checkout successful!", cart });
});
