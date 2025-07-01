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

// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
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
// import UpgradeSuccess from "./pages/upgrade/UpgradeSuccess";
// import AcceptInvitation from "./pages/projectDetails/AcceptInvitation";
// import Chatroom from "./pages/chat/Chatroom";
// import Footer from "./pages/footer/Footer";
// import Contact from "./pages/footer/Contact";
// import Terms from "./pages/footer/Terms";
// import Privacy from "./pages/footer/Privacy";

// function App() {
//   const dispatch = useDispatch();
//   const auth = useSelector((store) => store.auth);
//   const location = useLocation(); // Get current route

//   useEffect(() => {
//     return async () => {
//       const storedJwt = localStorage.getItem("jwt"); // Retrieve token from localStorage

//       if (storedJwt && storedJwt !== "null" && storedJwt !== "undefined") {
//         await dispatch(getUser());
//         await dispatch(fetchProjects({}, "true"));
//       }
//     };
//   }, []);

//   return (
//     <>
//       {auth.user ? (
//         <div>
//           <Navbar user={auth.user} />
//           <Routes>
//             <Route path="/home" element={<Home />} />
//             <Route path="/project/:id" element={<ProjectDetails />} />
//             <Route
//               path="/project/:projectId/issue/:issueId"
//               element={<IssueDetails />}
//             />
//             <Route path="/upgrade_plan" element={<Subscription />} />
//             {/* <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} /> */}
//             <Route path="/accept_invitation" element={<AcceptInvitation />} />
//             <Route path="/project/:id/Chatroom" element={<Chatroom />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/terms" element={<Terms />} />
//           </Routes>
//           <Footer />
//         </div>
//       ) : (
//         <Routes>
//           <Route path="/auth/login" element={<Login />} />
//           <Route path="/auth/signup" element={<Signup />} />
//           <Route path="/accept_invitation" element={<AcceptInvitation />} />
//           <Route path="/sprintly" element={<Contact />} />
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
import { useEffect, useState } from "react";
import { getUser } from "./redux/auth/Action";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { fetchProjects } from "./redux/project/Action";
import UpgradeSuccess from "./pages/upgrade/UpgradeSuccess";
import AcceptInvitation from "./pages/projectDetails/AcceptInvitation";
import Chatroom from "./pages/chat/Chatroom";
import Footer from "./pages/footer/Footer";
import Contact from "./pages/footer/Contact";
import Terms from "./pages/footer/Terms";
import Privacy from "./pages/footer/Privacy";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedJwt = localStorage.getItem("jwt");
      if (storedJwt && storedJwt !== "null" && storedJwt !== "undefined") {
        await dispatch(getUser());
        await dispatch(fetchProjects({}, "true"));
      }
      setLoading(false);
    };
    initAuth();
  }, [dispatch]);

  if (loading) return null; // or a loading spinner

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar user={auth.user} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            <Route path="/accept_invitation" element={<AcceptInvitation />} />
            <Route path="/project/:id/Chatroom" element={<Chatroom />} />
            <Route path="/contact" element={<Contact isLoggedIn={true} />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/accept_invitation" element={<AcceptInvitation />} />
          <Route path="/sprintly" element={<Contact isLoggedIn={false} />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
