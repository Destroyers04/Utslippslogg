import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact/contact-form";
import { Navbar } from "@/components/nav/navbar";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <>
      <Navbar />
      <ContactForm />
    </>
  );
}
