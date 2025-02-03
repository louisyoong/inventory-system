"use client";

import { useRouter } from "next/navigation";
import { Typography, Button } from "@mui/material";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div>
      <Typography variant="h5">货品详情 - SKU: {id}</Typography>
      <Typography>名称: 苹果</Typography>
      <Typography>库存: 50</Typography>
      <Button variant="contained" color="success" className="mr-2">
        ➕ 补货
      </Button>
      <Button variant="contained" color="error">
        ➖ 售出
      </Button>
    </div>
  );
}
