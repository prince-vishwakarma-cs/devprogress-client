import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Link,
  NavLink,
} from "react-router-dom";
import { userExist, userNotExist } from "./redux/reducers/authSlice";
import { useGetUserQuery } from "./redux/api/userAPI";
import toast, { Toaster } from "react-hot-toast";
import { Userinfo } from "./components/Userinfo";
import { LoadingScreenExtras } from "./components/LoadingScreenExtras";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Codechef = lazy(() => import("./pages/Codechef"));
const Codeforces = lazy(() => import("./pages/Codeforces"));
const Leetcode = lazy(() => import("./pages/Leetcode"));
const Login = lazy(() => import("./pages/Login"));
const GeeksForGeeks = lazy(() => import("./pages/GeeksForGeeks"));
const NotFound = lazy(() => import("./pages/NotFound"));

const NavChips = () => {
  return (
    <div className="flex space-x-4 !p-4 text-white overflow-x-auto whitespace-nowrap bg-background border-b border-bordercolor scrollbar-hide">
      <NavLink to="/" className="chip">
        <span>Home</span>
      </NavLink>
      <NavLink to="/leetcode" className="chip">
        <span>Leetcode</span>
      </NavLink>
      <NavLink to="/codeforces" className="chip">
        Codeforces
      </NavLink>
      <NavLink to="/codechef" className="chip">
        Codechef
      </NavLink>
      <NavLink to="/gfg" className="chip">
        GeeksForGeeks
      </NavLink>
    </div>
  );
};

// Loading Screen with animation and logo
export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100dvh] bg-background flex-col">
      <div className="mb-4">
        {/* Your SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-24 h-24 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      </div>
      <span className="text-xl text-white">Loading, please wait...</span>
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
        toast.error(error.data?.message);
      } else if (data && data.user) {
        dispatch(userExist({ user: data.user }));
      }
      setCheckingAuth(false);
    }
  }, [data, error, isLoading, dispatch]);

  if (isLoading || checkingAuth) {
    return <LoadingScreen />;
  }

  // Redirect to login if user is not logged in
  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="flex w-full h-[100dvh] bg-background">
        {/* Render this part only if user is logged in */}
        {user ? (
          <div className="flex w-full h-full">
            {/* User Info Section on Left */}
            <div className="w-1/4 p-4  bg-background min-w-[15rem] hidden sm:block">
              <Userinfo />
            </div>

            {/* Right Main Content: takes remaining space */}
            <div className="flex-1 flex flex-col overflow-y-auto h-full">
              {/* NavChips */}
              <div className="w-full p-4 text-white overflow-x-auto whitespace-nowrap scrollbar-hide">
                <NavChips />
              </div>

              {/* Main Content Routes */}
              <div className="flex-1 overflow-y-auto ">
                <Suspense fallback={<LoadingScreenExtras />}>
                  <Routes>
                    <Route
                      path="/"
                      element={<PrivateRoute element={<Home />} />}
                    />
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
          </div>
        ) : (
          // If the user is not logged in, render the login page
          <div className="flex items-center justify-center h-screen text-xl">
            <Suspense fallback={<LoadingScreen />}>
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
