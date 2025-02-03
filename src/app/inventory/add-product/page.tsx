"use client";

import { useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button, Container, TextField, Typography } from "@mui/material";
import "@/app/globals.css";

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleAddProduct = async () => {
    if (!sku || !name || !price || !quantity) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Check if SKU already exists
      const querySnapshot = await getDocs(collection(db, "products"));
      const existingProduct = querySnapshot.docs.find(
        (doc) => doc.data().sku === sku
      );

      if (existingProduct) {
        setError("This SKU already exists. Please use a different SKU.");
        setLoading(false);
        return;
      }

      const numericPrice = parseFloat(price);
      const numericQuantity = parseInt(quantity, 10);

      if (isNaN(numericPrice) || isNaN(numericQuantity)) {
        throw new Error("Price and quantity must be valid numbers.");
      }

      await addDoc(collection(db, "products"), {
        sku,
        name,
        price: numericPrice,
        quantity: numericQuantity,
        userId: user.uid,
        createdAt: new Date(),
      });

      setLoading(false);
      router.push("/inventory");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" className="mt-10">
      <Typography variant="h4" className="text-center bg-yellow-500 mb-4">
        Add Product
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="SKU"
        fullWidth
        className="mb-4"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
      <TextField
        label="Product Name"
        fullWidth
        className="mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Price"
        type="number"
        fullWidth
        className="mb-4"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Quantity"
        type="number"
        fullWidth
        className="mb-4"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddProduct}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </Button>
    </Container>
  );
}
