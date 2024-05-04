import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExpense from "./pages/AddExpense";
import Addbudget from "./pages/Addbudget";
import "react-toastify/dist/ReactToastify.css";
import UpdateCategory from "./pages/UpdateBudget";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/add-budget" element={<Addbudget />} />
        <Route path="/update-budget" element={<UpdateCategory />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
