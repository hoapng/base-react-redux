import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Question from "./components/Admin/Content/Question/Question";
import PrivteRoute from "./routes/PrivateRoute";
import { Suspense } from "react";

const NotFound = () => {
  return <div className="alert alert-danger mt-3 container">404 Not Found</div>;
};

const Layout = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route
              path="users"
              element={
                <PrivteRoute>
                  <ListQuiz />
                </PrivteRoute>
              }
            />
          </Route>

          <Route path="/quiz/:id" element={<DetailQuiz />} />

          <Route
            path="admins"
            element={
              <PrivteRoute>
                <Admin />
              </PrivteRoute>
            }
          >
            <Route index element={<DashBoard />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="manage-quizzes" element={<ManageQuiz />} />
            <Route path="manage-questions" element={<Question />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        {/* <ToastContainer /> */}
      </Suspense>
    </>
  );
};
export default Layout;
