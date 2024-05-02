import React from "react";
import { Chart } from "react-google-charts";

function ExpenseAndBudgetBarChart({ budget, expenses }) {
  const data = [["Category", "Budget", "Expense"]];

  budget.forEach((category) => {
    const categoryExpense = expenses.reduce((total, expense) => {
      if (expense.category === category.id) {
        return total + expense.amount;
      }
      return total;
    }, 0);

    data.push([category.category, category.amount, categoryExpense]);
  });

  const options = {
    chartArea: { width: "50%" },
    hAxis: {
      title: "Amount",
      minValue: 0,
    },
    vAxis: {
      title: "Category",
    },
  };
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default ExpenseAndBudgetBarChart;
