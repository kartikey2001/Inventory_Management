import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: number;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: number;
  changePercentage?: number;
  totalValue: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: number;
  totlPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenceSummaryId: number;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expensebyCategorySummaryId: number;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularproducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
} = api;