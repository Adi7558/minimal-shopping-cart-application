import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MyNavbar from "./componentns/Navbar/Navbar";
import Footer from "./componentns/Footer/Footer";
import ProductGrid from "./componentns/HomePage/ProductGrid";
import Cart from "./componentns/Cart/Cart";

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };


  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };


  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };


  const updateQuantity = (index, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  return (
    <Router>
      <div className="App">
        <MyNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <main className="my-6">
          <Routes>
            <Route path="/" element={<ProductGrid addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  setCart={setCart}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
