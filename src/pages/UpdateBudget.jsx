import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const { data } = useLocation().state;
  const [category, setCategory] = useState(data?.category);
  const [amount, setAmount] = useState(data?.amount);
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/budgets/${data?.id}`,
        {
          category,
          amount,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Updated succesfully", {
        position: "top-right",
      });
      navigate("/");
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
        <h1>Update Category</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Category Name"
            />
          </div>
          <div>
            <label htmlFor="budget">Budget:</label>
            <input
              type="number"
              id="budget"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Budget Amount"
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
