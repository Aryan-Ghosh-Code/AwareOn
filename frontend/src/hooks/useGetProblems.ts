import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetProblems = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const apiUrl = import.meta.env.VITE_API_URL;

  const getProblems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/${authUser?.role}/problem/problem-repository`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("UN-token")}`,
        },
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, getProblems };
};

export default useGetProblems;