import React, { useState } from "react";
import { useGetUserQuery, useLoginMutation, useRegisterMutation } from "../redux/api/userAPI";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refetch } = useGetUserQuery(); 

  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ userId, password });
      if (data && data.user) {
        dispatch(userExist({ user: data.user }));
        await refetch(); 
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ userId, password, name });
      if (data && data.user) {
        dispatch(userExist({ user: data.user }));
        await refetch(); 
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg w-96 ">
        <h2 className="text-3xl font-bold text-center mb-4 ">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          {!isLogin && (
            <div>
              <label className="block ">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 mt-2 border border-bordercolor rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="mt-4">
            <label className="block ">Username</label>
            <input
              type="text"
              placeholder="competitive_coder"
              className="w-full px-4 py-2 mt-2 border border-bordercolor rounded-lg focus:outline-none focus:ring-2 focus:ring-accent "
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block ">Password</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full px-4 py-2 mt-2 border border-bordercolor rounded-lg focus:outline-none focus:ring-2 focus:ring-accent "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 text-background bg-accent py-2 rounded-lg hover:bg-[var(--color-accent-bg)] transition duration-200"
            disabled={isLogin ? isLoginLoading : isRegisterLoading}
          >
            {isLogin ? (isLoginLoading ? "Logging in..." : "Login") : (isRegisterLoading ? "Creating Account..." : "Create Account")}
          </button>
        </form>
        {(loginError || registerError) && (
          <p className="text-red-500 text-sm text-center mt-2">
            {loginError?.message || registerError?.message}
          </p>
        )}
        <div className="mt-4 text-center text-secondary-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[var(--color-accent)] hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
