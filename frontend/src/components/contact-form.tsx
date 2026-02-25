import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactForm() {
  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Contact us</FieldLegend>
            <FieldDescription>
              We will get back to you as soon as possible
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                <Input id="first-name" placeholder="Ola" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                <Input id="last-name" placeholder="Nordmann" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="ola@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="company">Company Name</FieldLabel>
                <Input id="company" placeholder="Acme AS" required />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="comments">Comments</FieldLabel>
                <Textarea
                  id="comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}

export { ContactForm };
