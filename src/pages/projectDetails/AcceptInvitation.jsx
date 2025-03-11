import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AcceptInvitation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const executed = useRef(false); // Prevent multiple calls

  useEffect(() => {
    if (executed.current) return; // Ensure it runs only once
    executed.current = true;

    const acceptInvitation = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const authToken = localStorage.getItem("jwt");

      if (!token || !authToken) {
        setError("Invalid or expired invitation link.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:2024/api/projects/accept_invitation?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to accept invitation.");
        }

        alert("Invitation accepted! Redirecting...");
        navigate("/home");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    acceptInvitation();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <p>Accepting invitation...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Successfully joined the project! Redirecting...</p>
      )}
    </div>
  );
};

export default AcceptInvitation;
