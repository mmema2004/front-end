import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Overview = lazy(() => import("./pages/Overview"));
const LayOut = lazy(() => import("./pages/LayOut"));
const Profile = lazy(() => import("./pages/Profile"));
const Balances = lazy(() => import("./pages/Balances"));
const BalanceDetail = lazy(() => import("./pages/BalanceDetail"));

const Transactions = lazy(() => import("./pages/Transactions"));
const Bills = lazy(() => import("./pages/Bills"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Goals = lazy(() => import("./pages/Goals"));

const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LayOut />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to={localStorage.getItem("activeSidebar") || "overview"}
                  replace
                />
              }
            />
            <Route path="/overview" element={<Overview />} />
            <Route path="/balances" element={<Balances />} />
            <Route path="/balances/:id" element={<BalanceDetail />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/forget" element={<ForgetPassword />} />
          <Route path={`/reset-password`} element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
