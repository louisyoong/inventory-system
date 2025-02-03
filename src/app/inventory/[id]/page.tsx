"use client";

import { Typography, Button, Container } from "@mui/material";
import { useParams } from "next/navigation"; // ✅ Use `useParams` to get the ID
import "@/app/globals.css";

export default function ProductDetailPage() {
  const params = useParams(); // ✅ Get the `id` dynamically
  const id = params.id as string; // ✅ Ensure it's a string

  return (
    <Container>
      <Typography variant="h5">货品详情 - SKU: {id}</Typography>
      <Typography>名称: 苹果</Typography>
      <Typography>库存: 50</Typography>
      <Button variant="contained" color="success" className="mr-2">
        ➕ 补货
      </Button>
      <Button variant="contained" color="error">
        ➖ 售出
      </Button>
    </Container>
  );
}
