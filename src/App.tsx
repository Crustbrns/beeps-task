import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./src/pages/header/Header";
import LoginCompany from "./src/pages/auth/login-company/LoginCompany";
import Footer from "./src/pages/footer/Footer";
import EmailComponent from "./src/pages/auth/login-email/EmailComponent";

function App() {
  return (
    <div className="main-content">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginCompany />}></Route>
          <Route path="/sign" element={<EmailComponent />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
