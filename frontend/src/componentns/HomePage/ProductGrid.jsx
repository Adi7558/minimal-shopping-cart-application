import React, { useEffect, useState } from "react";

const ProductGrid = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/products")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.mens_kurta)) {
                    setProducts(data.mens_kurta);
                } else {
                    console.error("data is not an array:", data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setProducts([]);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (products.length === 0) return <p>No products available</p>;

    return (
        <div
            className="product-grid"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
            }}
        >
            {products.map((product, index) => (
                <div
                    key={index}
                    className="product-card"
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#f9f9f9",
                    }}
                >

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "10px",
                        }}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </div>


                    <div
                        style={{
                            padding: "10px",
                            textAlign: "center",
                            borderTop: "1px solid #ddd",
                        }}
                    >
                        <h3 style={{ margin: "5px 0", fontSize: "16px" }}>{product.name}</h3>
                        <p style={{ margin: "5px 0", fontWeight: "bold" }}>₹ {product.price}</p>
                        <button
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                transition: "background-color 0.2s",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                            onClick={() => {
                                console.log("Button clicked ");
                                addToCart(product);
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
