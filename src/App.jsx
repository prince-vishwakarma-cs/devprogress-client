import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { userExist, userNotExist } from "./redux/reducers/authSlice";
import { useGetUserQuery } from "./redux/api/userAPI";
import toast, { Toaster } from "react-hot-toast";
import { Userinfo } from "./components/Userinfo";

const Home = lazy(() => import("./pages/Home"));
const Codechef = lazy(() => import("./pages/Codechef"));
const Codeforces = lazy(() => import("./pages/Codeforces"));
const Leetcode = lazy(() => import("./pages/Leetcode"));
const Login = lazy(() => import("./pages/Login"));
const GeeksForGeeks = lazy(() => import("./pages/GeeksForGeeks"));
const NotFound = lazy(() => import("./pages/NotFound"));

const NavChips = () => {
  return (
    <div className="flex space-x-4 p-4 text-white shadow-lg">
      <Link to="/leetcode" className="chip">
        Leetcode
      </Link>
      <Link to="/codeforces" className="chip">
        Codeforces
      </Link>
      <Link to="/codechef" className="chip">
        Codechef
      </Link>
      <Link to="/gfg" className="chip">
        GeeksForGeeks
      </Link>
    </div>
  );
};

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserQuery();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        dispatch(userNotExist());
       toast.error(error.data?.message)
      } else if (data && data.user) {
        dispatch(userExist({ user: data.user }));
      }
      setCheckingAuth(false);
    }
  }, [data, error, isLoading, dispatch]);

  if (isLoading || checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  // Redirect to login if user is not logged in
  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col w-full h-screen bg-background-light">
        {/* Render this part only if user is logged in */}
        {user ? (
          <div className="flex w-full h-full">
            <div className="w-1/4 p-4 m-2 bg-background rounded-2xl min-w-[15rem]">
              <Userinfo />
            </div>
            <div className="w-3/4 overflow-y-auto">
              <NavChips />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<PrivateRoute element={<Home />} />} />
                  <Route
                    path="/leetcode"
                    element={<PrivateRoute element={<Leetcode />} />}
                  />
                  <Route
                    path="/codeforces"
                    element={<PrivateRoute element={<Codeforces />} />}
                  />
                  <Route
                    path="/codechef"
                    element={<PrivateRoute element={<Codechef />} />}
                  />
                  <Route
                    path="/gfg"
                    element={<PrivateRoute element={<GeeksForGeeks />} />}
                  />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        ) : (
          // If the user is not logged in, render the login page
          <div className="flex items-center justify-center h-screen text-xl">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/*" element={<Navigate to="/login" />} />
              </Routes>
            </Suspense>
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
