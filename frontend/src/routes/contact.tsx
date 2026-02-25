import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { Navbar } from "@/components/navbar";

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
