// Ví dụ sử dụng trong component cha (Header hoặc App)
import { useState } from "react";
import Login from "./components/login";
import SignIn from "./components/signin";

const App = () => {
  const [isAuth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginOpen(true);
    setSignInOpen(false);
  };

  const handleOpenSignIn = () => {
    setSignInOpen(true);
    setLoginOpen(false);
  };

  return (
    <div>
      {/* Buttons to open modals */}
      <button onClick={handleOpenLogin}>Đăng nhập</button>
      <button onClick={handleOpenSignIn}>Đăng ký</button>

      {/* Login Modal */}
      {loginOpen && (
        <Login
          setAuth={setAuth}
          setLoginOpen={setLoginOpen}
          setSignInOpen={setSignInOpen}
        />
      )}

      {/* SignIn Modal */}
      {signInOpen && (
        <SignIn setSignInOpen={setSignInOpen} setLoginOpen={setLoginOpen} />
      )}
    </div>
  );
};

export default App;
