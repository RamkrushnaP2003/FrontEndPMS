import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./pages/navbar/Navbar";
import ProjectDetails from "./pages/projectDetails/ProjectDetails";
import IssueDetails from "./pages/issueDetails/IssueDetails";
import Subscription from "./pages/upgrade/Subscription";
import Auth from "./pages/auth/Auth";

function App() {
  return (
    <>
      {true ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
