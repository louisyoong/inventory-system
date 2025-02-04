"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import "@/app/globals.css";

type Product = {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

export default function InventoryPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    name: string;
    quantity: string;
    price: string;
  }>({
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchProducts();
    }
  }, [user, loading, router]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsList);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load products.");
    }
  };

  // Handle clicking "Edit"
  const handleEditClick = (product: Product) => {
    setEditingProduct(product.id);
    setEditValues({
      name: product.name || "",
      quantity: product.quantity?.toString() || "0",
      price: product.price?.toString() || "0",
    });
  };

  // Handle saving the edited product
  const handleSaveEdit = async (productId: string) => {
    const numericQuantity = parseInt(editValues.quantity, 10);
    const numericPrice = parseFloat(editValues.price);

    if (isNaN(numericQuantity) || isNaN(numericPrice)) {
      alert("Quantity and price must be valid numbers.");
      return;
    }

    try {
      await updateDoc(doc(db, "products", productId), {
        name: editValues.name,
        quantity: numericQuantity,
        price: numericPrice,
      });
      setEditingProduct(null);
      fetchProducts(); // Refresh data after update
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to update product.");
    }
  };

  // Handle deleting a product
  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      fetchProducts(); // Refresh data after deletion
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to delete product.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography
        variant="h5"
        className="tw-mb-4 tw-text-gray-800 tw-text-bold tw-mt-5"
      >
        Inventory
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        className="tw-mb-4 tw-bg-green-700 tw-text-white"
        onClick={() => router.push("/inventory/add-product")}
      >
        + Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.sku}</TableCell>
                <TableCell>
                  {editingProduct === product.id ? (
                    <TextField
                      value={editValues.name}
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct === product.id ? (
                    <TextField
                      type="number"
                      value={editValues.price}
                      onChange={(e) =>
                        setEditValues({ ...editValues, price: e.target.value })
                      }
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct === product.id ? (
                    <TextField
                      type="number"
                      value={editValues.quantity}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          quantity: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.quantity
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct === product.id ? (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleSaveEdit(product.id)}
                        className="tw-mx-1 tw-bg-green-700"
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setEditingProduct(null)}
                        className="tw-mx-1 tw-border-green-700 tw-text-green-700"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditClick(product)}
                        className="tw-mx-1 tw-border-green-700 tw-text-green-700"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
