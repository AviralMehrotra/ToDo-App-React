// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <h2>Login</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            autoComplete="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
            autoComplete="password"
            required
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>or</h4>
          <Link to={"/register"}>Register</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
