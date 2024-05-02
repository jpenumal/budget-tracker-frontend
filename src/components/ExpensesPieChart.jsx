import React, { useMemo } from "react";
import Chart from "react-google-charts";

function ExpensesPieChart({ expenses, budget }) {
  const expensesData = expenses?.map((expense) => {
    const category = budget?.find(
      (category) => category.id === expense.category
    );
    return { ...expense, category: category ? category.category : "Unknown" };
  });

  const formattedExpensesData = useMemo(() => {
    let result = expensesData.map((expense) => [
      expense.category,
      expense.amount,
    ]);
    result.unshift(["Category", "Amount"]);
    return result;
  }, [expensesData]);

  const chartOptions = {
    title: "Expenses Distribution",
  };

  return (
    <div
      style={{
        background: "#eff0f4",
        padding: "30px 0px",
        borderBottom: "1px solid black",
      }}
    >
      <Chart
        chartType="PieChart"
        data={formattedExpensesData}
        options={chartOptions}
        width={"80%"}
        style={{
          margin: "auto",
        }}
        height={"400px"}
      />
    </div>
  );
}

export default ExpensesPieChart;
