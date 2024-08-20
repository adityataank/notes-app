import { Children, useState } from "react";

import Input from "../ui/input";
import RouteLink from "../ui/route-link";
import { Button } from "../ui/button";

import FieldsJSON from "@/pages/sign-in/fields.json";
import { type SignInForm } from "@/lib/types";

function SignIn() {
  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setFormData({ ...formData, [fieldName]: fieldValue });
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
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
        <Button variant={"primary"}>Sign in</Button>
      </form>
      <p className="text-black text-xs font-semibold mt-auto md:mt-14">
        Don't have an account?{" "}
        <RouteLink path="/sign-up">Create account</RouteLink>
      </p>
    </div>
  );
}

export default SignIn;
