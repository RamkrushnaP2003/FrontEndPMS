// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Navbar from "./pages/navbar/Navbar";
// import ProjectDetails from "./pages/projectDetails/ProjectDetails";
// import IssueDetails from "./pages/issueDetails/IssueDetails";
// import Subscription from "./pages/upgrade/Subscription";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getUser } from "./redux/auth/Action";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import { fetchProjects } from "./redux/project/Action";

// function App() {
//   const dispatch = useDispatch();
//   const { auth } = useSelector((store) => store);

//   useEffect(() => {
//     if (auth.jwt && auth.jwt !== "null" && auth.jwt !== "undefined") {
//       dispatch(getUser());
//       dispatch(fetchProjects({}));
//     }
//   }, [auth.jwt]);

//   return (
//     <>
//       {auth.user ? (
//         <div>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/project/:id" element={<ProjectDetails />} />
//             <Route
//               path="/project/:projectId/issue/:issueId"
//               element={<IssueDetails />}
//             />
//             <Route path="/upgrade_plan" element={<Subscription />} />
//           </Routes>
//         </div>
//       ) : (
//         <Routes>
//           <Route path="/auth/login" element={<Login />} />
//           <Route path="/auth/signup" element={<Signup />} />
//         </Routes>
//       )}
//     </>
//   );
// }

// export default App;

import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./pages/navbar/Navbar";
import ProjectDetails from "./pages/projectDetails/ProjectDetails";
import IssueDetails from "./pages/issueDetails/IssueDetails";
import Subscription from "./pages/upgrade/Subscription";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/auth/Action";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { fetchProjects } from "./redux/project/Action";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt"); // Retrieve token from localStorage

    if (storedJwt && storedJwt !== "null" && storedJwt !== "undefined") {
      dispatch(getUser());
      dispatch(fetchProjects({})); // Load projects
    }
  }, []);

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
