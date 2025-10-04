import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateQuantity, setCart, clearCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        try {
            const res = await fetch("http://localhost:8000/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart }),
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                clearCart();
            } else {
                alert("Checkout failed: " + data.message);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong during checkout.");
        }
    };

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Your cart is empty </h2>
                <Link to="/">Go back to products</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
            <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {cart.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            marginBottom: "15px",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "10px",
                        }}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ width: "80px", height: "80px", objectFit: "contain" }}
                        />
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                            <p style={{ margin: 0 }}>₹ {item.price}</p>
                        </div>
                        <div>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    updateQuantity(index, parseInt(e.target.value) || 1)
                                }
                                style={{ width: "60px", padding: "5px" }}
                            />
                        </div>
                        <button
                            onClick={() => removeFromCart(index)}
                            style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#dc3545",
                                color: "#fff",
                            }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Total: ₹ {total}</h3>
            <button
                style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#28a745",
                    color: "white",
                    cursor: "pointer",
                    marginTop: "10px",
                }}
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </div>
    );
};

export default Cart;
