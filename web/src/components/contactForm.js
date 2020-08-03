import React from "react";
import Button from "./button";
import { Container } from "./container";
import { Heading } from "./heading";
import Input from "./input";
import { Paragraph } from "./paragraph";
import { Typography } from "./typography";

export default function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");

  const [nameValid, setNameValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [textValid, setTextValid] = React.useState(true);

  const validateString = (input, setFunc) => {
    const result = input !== null && input !== undefined && input !== "";

    if (setFunc) {
      setFunc(result);
    }

    return result;
  };

  const validateEmail = (input, setFunc) => {
    const result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(
      input
    );

    if (setFunc) {
      setFunc(result);
    }

    return result;
  };

  const onFormSubmit = () => {
    const nameValidationResult = validateString(name, setNameValid);
    const emailValidationResult = validateEmail(email, setEmailValid);
    const textValidationResult = validateString(text, setTextValid);

    if (nameValidationResult && emailValidationResult && textValidationResult) {
      setSubmitting(true);
      fetch("/api/sendMail", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          text: text
        })
      });
    }
  };

  const renderContactFormContent = () => {
    if (submitting) {
      return (
        <>
          <Typography as="h2" textAlign="center">
            Thank you!
          </Typography>
          <Typography paragraph textAlign="center">
            You'll hear from me soon.
          </Typography>
        </>
      );
    }

    return (
      <>
        <Heading as="h2" textAlign="center">
          Let’s have a chat
        </Heading>
        <Paragraph textAlign="center">
          I’m always happy to talk about working together, new opportunities or just a friendly
          hello.
        </Paragraph>
        <form>
          <Input
            id="full-name"
            placeholder="Full name"
            error={!nameValid}
            errorText="Du må fylle inn ditt navn"
            type="text"
            onChange={value => {
              setName(value);
              validateString(value, setNameValid);
            }}
            onBlur={value => validateString(value, setNameValid)}
          />
          <Input
            id="email-address"
            placeholder="Email address"
            error={!emailValid}
            errorText="Du må fylle inn din e-postadresse"
            type="email"
            onChange={value => {
              setEmail(value);
              validateEmail(value, setEmailValid);
            }}
            onBlur={value => validateEmail(value, setEmailValid)}
          />
          <Input
            id="text"
            label="Text"
            error={!textValid}
            errorText="Du må skrive en tekst"
            placeholder="Hey Tommy, I'm interested in chatting about a role we have available..."
            multiline
            onChange={value => {
              setText(value);
              validateString(value, setTextValid);
            }}
            onBlur={value => validateString(value, setTextValid)}
          />
          <Button onClick={onFormSubmit} mt={5} maxWidth="20rem">
            Send message
          </Button>
        </form>
      </>
    );
  };

  return (
    <Container centerSection maxWidth="56rem">
      {renderContactFormContent()}
    </Container>
  );
}
