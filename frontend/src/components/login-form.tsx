import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { getLogInToken } from "@/api/api";
import { useNavigate } from "@tanstack/react-router";

function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate({ from: "/login" });

  // Check if the user is already logged in by looking for a token in localStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate({ to: "/dashboard" });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const token = await getLogInToken(email, password);
    // Storing the token in localStorage for demonstration purposes, consider using a more secure storage method in production.
    localStorage.setItem("token", token);
  };

  async function submitUserData(previousState, formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      await handleLogin(email, password);
      return "success";
    } catch (error) {
      return "Invalid email or password. Please try again.";
    }
  }

  const [state, formAction, isPending] = useActionState(submitUserData, 0);

  useEffect(() => {
    if (state === "success") {
      navigate({ to: "/dashboard" });
    }
  }, [state]);

  useEffect(() => {
    if (state && state !== "success") {
      toast.error(state, { position: "top-center" });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Guest@example.com"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button type="submit">
            {isPending ? "Logging you in..." : "Log in"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account or forgot your password?{" "}
            <a href="/about" className="underline underline-offset-4">
              Contact us!
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export { LoginForm };
