import React, { useMemo, useState } from "react";

function ProductList() {
  const [products] = useState([
    { id: 1, name: "laptop", price: 1200, category: "Electronics" },
    { id: 2, name: "mouse", price: 25, category: "Electronics" },
    { id: 3, name: "keyboard", price: 75, category: "Electronics" },
    { id: 4, name: "book", price: 20, category: "Electronics" },
    { id: 5, name: "monitor", price: 300, category: "Electronics" },
  ]);
  const [filter, setFilter] = useState("");

  const expensiveFilteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, products]);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "16px" }}>Product List</h2>
      <input
        type="text"
        placeholder="Filter products..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {expensiveFilteredProducts.map((product) => (
          <li
            key={product.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              background: "#f1f5f9",
              borderRadius: "6px",
            }}
          >
            <strong>{product.name}</strong> — ${product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
