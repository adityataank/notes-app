import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotesPage from "./pages/notes";
import SignInPage from "./pages/sign-in";
import SecuredLayout from "./pages/layout";
import SignUpPage from "./pages/sign-up";
import ResetPassword from "./pages/reset-password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecuredLayout />}>
          <Route path="notes" element={<NotesPage />}/>
          <Route path="sign-in" element={<SignInPage />}/>
          <Route path="sign-up" element={<SignUpPage />}/>
          <Route path="reset-password" element={<ResetPassword />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
