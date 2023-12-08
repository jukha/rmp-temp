import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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

// import React, { createContext, useContext, useReducer } from "react";
// import { loginApi, signupApi } from "../services/apiAuth";
// import { useNavigate } from "react-router";

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
// };

// const FAKE_USER = {
//   name: "Jack Sparrow",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "login":
//       return {
//         ...state,
//         user: action.payload.user,
//         isAuthenticated: action.payload.isAuthenticated,
//         loading: false,
//       };
//     case "logout":
//       return initialState;
//     case "start_loading":
//       return { ...state, loading: true };
//     case "stop_loading":
//       return { ...state, loading: false };
//     default:
//       throw new Error("Unknown action");
//   }
// }

// function AuthProvider({ children }) {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const storedToken = localStorage.getItem("token");

//   const navigate = useNavigate();

//   const [{ user, isAuthenticated, loading }, dispatch] = useReducer(reducer, {
//     initialState,
//     // user: storedUser || null,
//     // isAuthenticated: storedUser && storedToken,
//     // loading: false,
//   });

//   async function login(email, password) {
//     if (email === FAKE_USER.email && password === FAKE_USER.password) {
//       dispatch({ type: "login", payload: FAKE_USER });
//     }

//     // try {
//     //   dispatch({ type: "start_loading" });

//     //   const response = await loginApi(email, password);
//     //   const {
//     //     data: { user, token },
//     //   } = response;

//     //   localStorage.setItem("user", JSON.stringify(user));
//     //   localStorage.setItem("token", token);

//     //   dispatch({ type: "login", payload: { user, isAuthenticated: true } });
//     // } catch (error) {
//     //   toast.error(error.message);
//     // } finally {
//     //   dispatch({ type: "stop_loading" });
//     // }
//   }

//   async function signup(userData) {
//     try {
//       dispatch({ type: "start_loading" });

//       const response = await signupApi(userData);
//       const {
//         data: { user, token },
//       } = response;

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       dispatch({ type: "login", payload: { user, isAuthenticated: true } });
//       toast.success(response.message, { autoClose: 1500 });

//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       dispatch({ type: "stop_loading" });
//     }
//   }

//   function logout() {
//     dispatch({ type: "logout" });
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   }

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated, loading, login, signup, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("AuthContext was used outside AuthProvider");
//   return context;
// }

// export { AuthProvider, useAuth };
