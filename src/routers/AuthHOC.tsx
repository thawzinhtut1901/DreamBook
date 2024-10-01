import { Navigate } from "react-router-dom";
import { getToken } from "@/services/authService";
import { ReactNode } from "react";
import { useGetMe } from "@/hooks/useUser";
import Swal from "sweetalert2";

const AuthHOC = ({ children }: { children: ReactNode }) => {
  const token = getToken() || "";
  const { data } = useGetMe(token);
  if (!token) {
    Swal.fire({
      title: "Error!",
      text: "You need to Login first!",
      confirmButtonText: "Okay",
    });
    return <Navigate to="/auth/login" replace />;
  }
  if (data && (!data.profilePicture || !data.name || !data.bio)) {
    Swal.fire({
      title: "Error!",
      text: "You need to complete your profile setup first!",
      confirmButtonText: "OK",
    });
    return <Navigate to="/me" replace />;
  }
  return children;
};

export default AuthHOC;
