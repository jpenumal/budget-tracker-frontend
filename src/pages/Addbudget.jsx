import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { ReactComponent as Budget } from "../assets/budget.svg";
import { toast } from "react-toastify";

function Addbudget() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const { token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/addBudget",
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

      setCategory("");
      setAmount("");
      toast.success("Added succesfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        // width: "100vw",
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
        <h1>ADD BUDGET CATEGORY</h1>
        <div style={{ display: "flex" }}>
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
              />
            </div>
            <button
              style={{ backgroundColor: "rgb(108, 99, 255)" }}
              type="submit"
            >
              Add
            </button>
          </form>
          <span>
            <Budget />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Addbudget;
