import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { ReactComponent as Expense } from "../assets/expense.svg";

const AddExpensePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("budget-access-token");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/budgets", {
          headers: {
            Authorization: token,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/addExpense",
        {
          category: selectedCategory,
          description,
          amount,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSelectedCategory("");
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <div
        style={{
          background: "#eff0f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h1>ADD EXPENSE</h1>
        <div style={{ display: "flex" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div className="form-control-container">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                className="form-control"
                style={{ height: "30px", width: "320px" }}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control-container">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-control-container">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button type="submit">Add</button>
          </form>
          <span>
            <Expense />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
