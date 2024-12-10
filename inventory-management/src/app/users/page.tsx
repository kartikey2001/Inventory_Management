"use client";
import React from "react";
import { useGetUsersQuery } from "@/state/api";
import Header from "../(components)/Header";
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const columns = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div className="text-red-500 font-semibold text-center">
        Error fetching users
      </div>
    );

  return (
    <div>
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-hray-700"
      />
    </div>
  );
};

export default Users;
