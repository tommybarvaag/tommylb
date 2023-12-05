import ContactMeForm from "@/components/contact-me-form";

type ContactMeProps = {
  location?: string;
};

export default function ContactMe({ location = "frontpage" }: ContactMeProps) {
  return <ContactMeForm location={location} />;
}
