import { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import RouteLink from "@/components/ui/route-link";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { type SignUpForm } from "@/lib/types";
import FieldsJSON from "@/pages/sign-up/fields.json";
import { API_ENDPOINTS } from "@/lib/requests/routes";
import { REQUEST } from "@/lib/requests/request";

import { useLoading } from "@/lib/hooks/useLoading";

function SignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, startLoading, stopLoading] = useLoading();

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setFormData({ ...formData, [fieldName]: fieldValue });
    }
  };

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      startLoading();
      try {
        if (formData.password !== formData.confirm_password) {
          return toast.warning("Ensure both passwords are the same.");
        }
        const url = API_ENDPOINTS.create_user();
        const promise = REQUEST.post(url, formData);
        toast.promise(promise, {
          loading: "Registering a new user...",
          success: (data) => {
            navigate("/sign-in");
            return data?.message
              ? data.message + " Please sign in."
              : "Signed up successfully! Please sign in.";
          },
          error: (data) => {
            return data?.error ?? "Unable to sign up.";
          },
          finally: () => stopLoading(),
        });
      } catch (err) {
        console.log("Error while creating a new user", err);
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-black">Create account</h1>
      <form
        className="flex flex-col gap-4 mt-12 w-full max-w-80"
        onSubmit={createAccount}
      >
        {Children.toArray(
          FieldsJSON.map((field) => (
            <Input onChange={handleOnChange} {...field} />
          ))
        )}
        <Button variant={"primary"} type="submit" disabled={loading}>
          Create account
        </Button>
      </form>
      <p className="text-black text-xs font-semibold mt-auto md:mt-14">
        Already have an account? <RouteLink path="/sign-in">Log in</RouteLink>
      </p>
    </div>
  );
}

export default SignUp;
