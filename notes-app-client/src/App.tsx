import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SignInPage from "./pages/sign-in";
import Layout from "./pages/layout/layout";
import SignUpPage from "./pages/sign-up";
import ResetPassword from "./pages/reset-password";
import NotesLayout from "./pages/layout/notes-layout";
import NotesPage from "./pages/notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={"/notes"} />} />
          <Route path="notes" element={<NotesLayout />}>
            <Route index element={<NotesPage />} />
            <Route path="new" element={<>NEW</>} />
          </Route>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
