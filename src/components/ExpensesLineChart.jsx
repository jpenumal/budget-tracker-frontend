import React from "react";
import { Chart } from "react-google-charts";

function ExpensesLineChart() {
  const data = [
    ["Category", "Expenses"],
    ["Food", 200],
    ["Transportation", 150],
    ["Utilities", 300],
    ["Entertainment", 250],
    ["Shopping", 400],
  ];
  return (
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: "Expense Trends",
        hAxis: {
          title: "Category",
        },
        vAxis: {
          title: "Total Expenses",
        },
      }}
      rootProps={{ "data-testid": "3" }}
    />
  );
}

export default ExpensesLineChart;
