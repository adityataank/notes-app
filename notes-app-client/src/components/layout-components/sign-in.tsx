import { Children, useState } from "react";
import { toast } from "sonner";

import Input from "../ui/input";
import RouteLink from "../ui/route-link";
import { Button } from "../ui/button";

import FieldsJSON from "@/pages/sign-in/fields.json";

import { type SignInForm } from "@/lib/types";
import { cookies } from "@/lib/cookies";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/lib/requests/routes";
import { REQUEST } from "@/lib/requests/request";

function SignIn() {
  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setFormData({ ...formData, [fieldName]: fieldValue });
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      try {
        const url = API_ENDPOINTS.login_user();
        const promise = REQUEST.post(url, formData);
        toast.promise(promise, {
          loading: "Logging in...",
          success: (data) => {
            cookies.setCookie("userToken", data.token);
            navigate("/notes");
            return data?.message ?? "Logged in successfully!";
          },
          error: (data) => {
            return data?.error ?? "Unable to log in.";
          },
        });
      } catch (err) {
        console.log("Error while logging in", err);
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black">Sign in</h1>
      <form
        className="flex flex-col gap-5 mt-14 w-full max-w-80"
        onSubmit={handleLogin}
      >
        {Children.toArray(
          FieldsJSON.map((field) => (
            <Input onChange={handleOnChange} {...field} />
          ))
        )}
        <RouteLink path="/reset-password" className="justify-self-start">
          Forgot Password?
        </RouteLink>
        <Button variant={"primary"} type="submit">
          Sign in
        </Button>
      </form>
      <p className="text-black text-xs font-semibold mt-auto md:mt-14">
        Don't have an account?{" "}
        <RouteLink path="/sign-up">Create account</RouteLink>
      </p>
    </div>
  );
}

export default SignIn;
