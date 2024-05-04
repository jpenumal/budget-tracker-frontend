import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

function BudgetTable({ budget, expenses, fetch }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const data = [
    { id: 1, category: "Food", budget: 500, expense: 300 },
    { id: 2, category: "Transportation", budget: 200, expense: 150 },
    { id: 3, category: "Entertainment", budget: 100, expense: 80 },
    { id: 4, category: "Utilities", budget: 300, expense: 250 },
    { id: 5, category: "Healthcare", budget: 150, expense: 120 },
  ];

  const deleteBudget = (id) => {
    axios
      .delete("http://localhost:3000/api/budgets/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        fetch();
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate("/login");
        }
      });
  };

  return (
    <table className="bordered-table" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Budget</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {budget?.map((item) => (
          <tr key={item.id}>
            <td>{item.category}</td>
            <td>{item.amount}</td>
            <td>
              <Link to={`/update-budget`} state={{ data: item }}>
                Modify
              </Link>
              <button
                style={{ marginLeft: "5px" }}
                onClick={() => deleteBudget(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BudgetTable;
