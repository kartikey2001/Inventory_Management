"use client";

import { useGetProductsQuery } from "@/state/api";
import React from "react";
import Header from "@/app/(components)/Header";
import { DataGrid } from "@mui/x-data-grid";

const Inventory = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div className="py-4">Loading...</div>;
  if (error || !products)
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Product
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={[
          { field: "productId", headerName: "ID", width: 90 },
          { field: "name", headerName: "Product Name", width: 200 },
          {
            field: "price",
            headerName: "Price",
            width: 110,
            type: "number",
            valueGetter: (value, row) => `$${row.price}`,
          },
          {
            field: "rating",
            headerName: "Rating",
            width: 110,
            type: "number",
            valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
          },
          {
            field: "stockQuantity",
            headerName: "Stock Quantity",
            width: 150,
            type: "number",
          },
        ]}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 text-gray-700"
      />
    </div>
  );
};

export default Inventory;
