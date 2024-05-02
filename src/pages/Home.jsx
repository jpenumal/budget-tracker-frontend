import React from "react";
import ExpensesPieChart from "../components/ExpensesPieChart";
import ExpenseHistoryChart from "../components/ExpenseHistoryChart";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseAndBudgetBarChart from "../components/ExpenseAndBudgetBarChart";
import { ReactComponent as NoData } from "../assets/no_data.svg";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("budget-access-token");
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/expenses", {
          headers: {
            Authorization: token,
          },
        })
        .then((data) => {
          setExpenses(data.data);
        })
        .catch((err) => {
          // toast.error("Something went wrong");
          if (err.response.status == 401) {
            navigate("/login");
          }
        });
      axios
        .get("http://localhost:3000/api/budgets", {
          headers: {
            Authorization: token,
          },
        })
        .then((data) => {
          setCategories(data.data);
        })
        .catch((err) => {
          // toast.error("Something went wrong");
          if (err.response.status == 401) {
            navigate("/login");
          }
        });
    }
  }, [token]);

  return (
    <div>
      <Header />
      <div className="content-wrapper">
        {!categories.length || !expenses.length ? (
          <div className="empty-placeholder">
            <span>
              <NoData />
            </span>
            <div>No Categories or No Expenses found, please add them</div>
          </div>
        ) : (
          <>
            <ExpensesPieChart budget={categories} expenses={expenses} />
            <ExpenseHistoryChart budget={categories} expenses={expenses} />
            <ExpenseAndBudgetBarChart budget={categories} expenses={expenses} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
