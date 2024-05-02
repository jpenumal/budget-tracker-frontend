import React, { useMemo } from "react";
import { Chart } from "react-google-charts";

function ExpenseHistoryChart({ budget, expenses }) {
  const expensesData = expenses?.map((expense) => {
    const category = budget?.find(
      (category) => category.id === expense.category
    );
    return { ...expense, category: category ? category.category : "Unknown" };
  });
  const chartData = useMemo(() => {
    if (budget.length) {
      var result = Array(12);
      for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(i);
        result[i] = [date.toLocaleString("default", { month: "long" })];
      }
      var categoriesList = budget.map((category) => category.category);
      categoriesList.unshift("Month");
      for (let month = 1; month <= 12; month++) {
        budget.forEach((expenseCategory) => {
          const expensesInThisCategory = expenses?.filter((expense) => {
            return (
              expense.category === expenseCategory.id &&
              new Date(expense.created_at).getMonth() + 1 === month
            );
          });
          const totalExpenses = expensesInThisCategory?.reduce(
            (acc, cur) => acc + cur.amount,
            0
          );
          result[month - 1].push(totalExpenses);
        });
      }
      result.unshift(categoriesList);
      return result;
    }
  }, [budget, expensesData]);

  const options = {
    height: 500,
    chart: {
      title: "Category Wise Expense History",
    },
  };

  return (
    <div
      style={{
        background: "#eff0f4",
        padding: "30px 0px",
      }}
    >
      <Chart
        chartType="Line"
        width="80%"
        data={chartData}
        options={options}
        style={{
          margin: "auto",
        }}
      />
    </div>
  );
}

export default ExpenseHistoryChart;
