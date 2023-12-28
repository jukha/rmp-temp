import React, { createContext, useContext, useReducer } from "react";
import { loginApi, signupApi, googleAuthApi, updateUserApi } from "../services/apiAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        loading: false,
      };
    case "update_user":
      return {
        ...state,
        user: action.payload.user,
      };
    case "logout":
      return initialState;
    case "start_loading":
      return { ...state, loading: true };
    case "stop_loading":
      return { ...state, loading: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const navigate = useNavigate();

  const [{ user, isAuthenticated, loading }, dispatch] = useReducer(reducer, {
    initialState,
    user: storedUser || null,
    isAuthenticated: storedUser && storedToken,
    loading: false,
  });

  async function login(email, password) {
    try {
      dispatch({ type: "start_loading" });

      const response = await loginApi(email, password);
      const {
        data: { user, token },
      } = response;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      dispatch({ type: "login", payload: { user, isAuthenticated: true } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  async function signup(userData) {
    try {
      dispatch({ type: "start_loading" });

      const response = await signupApi(userData);
      const {
        data: { user, token },
      } = response;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      dispatch({ type: "login", payload: { user, isAuthenticated: true } });
      toast.success(response.message, { autoClose: 1500 });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  async function googleAuth(accessToken) {
    try {
      dispatch({ type: "start_loading" });

      const response = await googleAuthApi(accessToken);
      const {
        data: { user, token },
      } = response;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      dispatch({ type: "login", payload: { user, isAuthenticated: true } });
      toast.success(response.message, { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  async function updateUser(data) {
    try {
      dispatch({ type: "start_loading" });

      const response = await updateUserApi(data);
      const updatedUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "update_user", payload: { user: updatedUser } });

      toast.success(response.message);
    } catch (error) {
      toast.error("Error updating user:", error);
      console.log(error);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        googleAuth,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
