import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/");
    else navigate("/login");
  });
  return <div>PageNotFound</div>;
}

export default PageNotFound;
