"use client";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/state/api";
import React, { useMemo } from "react";
import Header from "../(components)/Header";
import {
  Pie,
  ResponsiveContainer,
  PieChart,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  const expences = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expences
      .filter((data: ExpenseByCategorySummary) => {
          const matchesCategory =
            selectedCategory === "All" || data.category === selectedCategory;
          const dataDate = parseDate(data.date);
          const matchesDate =
            !startDate ||
            !endDate ||
            (dataDate >= startDate && dataDate <= endDate);
          return matchesCategory && matchesDate;
        })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
          };
          (acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`),
            (acc[data.category].amount += amount);
        }
        return acc;
      }, {});
    return Object.values(filtered);
  }, [expences, selectedCategory, startDate, endDate]);

  const classNames = {
    label: "block text-sm font-bold text-gray-700",
    selectInput:
      "mt-1 block pr-10 py-2 pl-3 w-full text-base border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError || !expensesData)
    return (
      <div className="text-red-500 font-semibold text-center">
        Error fetching Expenses
      </div>
    );

  return (
    <div>
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTER*/}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="ww-fll md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by category and date
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/*Start Date*/}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/*End Date*/}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29, 78, 216)" : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
