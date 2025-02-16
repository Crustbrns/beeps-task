import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Header from "./src/pages/header/Header";
import LoginCompany from "./src/pages/auth/login-company/LoginCompany";
import Footer from "./src/pages/footer/Footer";
import EmailComponent from "./src/pages/auth/login-email/EmailComponent";
import { createContext, useState } from "react";
import Blur from "./src/components/blur/Blur";
import Main from "./src/pages/main/Main";

interface AuthContextType {
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <div className="main-content">
        <BrowserRouter>
          <Header />
          <Blur />
          <Main>
            <Routes>
              {token.length === 0 ? (
                <>
                  <Route path="/sign" element={<EmailComponent />}></Route>
                </>
              ) : (
                <Route path="/" element={<LoginCompany />}></Route>
              )}
              <Route
                path="*"
                element={<Navigate to={token.length > 0 ? "/" : "/sign"} />}
              />
            </Routes>
          </Main>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
