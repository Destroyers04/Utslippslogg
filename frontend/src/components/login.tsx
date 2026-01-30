import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

function LogInForm() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate({ from: "/" });
  const [error, submitAction, isPending] = useActionState(
    async (previousError, formData) => {
      // Runs on form submit
      const username = formData.get("email");
      const password = formData.get("password");

      if (
        username?.toString().toLowerCase() === "admin" &&
        password === "password"
      ) {
        // success
        setUser({ role: "admin" });
        console.log("Logged in as admin!");
        navigate({ to: "/dashboard" });
        return null;
      }
      if (
        username?.toString().toLowerCase() === "user" &&
        password === "password"
      ) {
        // success
        setUser({ role: "user" });
        console.log("Logged in as user!");
        navigate({ to: "/dashboard" });
        return null;
      }

      // fail

      console.log("couldnt log you in");
      return "Invalid credentials";
    },
    null, // initial error state
  );
  return (
    <form action={submitAction}>
      <FieldGroup className="gap-2">
        <Field orientation="vertical">
          <FieldLabel htmlFor="email" className="w-1/2">
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            placeholder="ola.nordmann@example.com"
          />
        </Field>
        <Field orientation="vertical">
          <FieldLabel htmlFor="password" className="w-1/2">
            Password
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password123"
          />
        </Field>
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  );
}
export { LogInForm };
