import { useEffect } from "react";
import { useNavigate } from "react-router"; // use react-router-dom, not just react-router
import useAuthStore from "../store/useAuthStore";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const navigate = useNavigate();

  // Load user data on mount
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        />
      </div>
    );
  }

  return <>{children}</>;
}
