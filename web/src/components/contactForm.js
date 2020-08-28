import React from "react";
import { Box, Button, Container, Heading, Input, Label, Text, Textarea } from "theme-ui";

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
          <Heading as="h2" textAlign="center">
            Thank you!
          </Heading>
          <Text paragraph textAlign="center">
            You'll hear from me soon.
          </Text>
        </>
      );
    }

    return (
      <>
        <Heading as="h2" textAlign="center">
          Let’s have a chat
        </Heading>
        <Text textAlign="center">
          I’m always happy to talk about working together, new opportunities or just a friendly
          hello.
        </Text>
        <Box as="form" onSubmit={e => e.preventDefault()}>
          <Label htmlFor="full-name">Username</Label>
          <Input
            id="full-name"
            placeholder="Full name"
            type="text"
            onChange={e => {
              setName(e.target.value);
              validateString(e.target.value, setNameValid);
            }}
            onBlur={e => validateString(e.target.value, setNameValid)}
            required
          />
          <Label htmlFor="email-address">Email address</Label>
          <Input
            id="email-address"
            placeholder="your@email.com"
            type="email"
            onChange={e => {
              setEmail(e.target.value);
              validateEmail(e.target.value, setEmailValid);
            }}
            onBlur={e => validateEmail(e.target.value, setEmailValid)}
            required
          />
          <Label htmlFor="email-address">Text</Label>
          <Textarea
            id="text"
            placeholder="Hey Tommy, I'm interested in chatting about a role we have available..."
            rows="6"
            onChange={e => {
              setText(e.target.value);
              validateString(e.target.value, setTextValid);
            }}
            onBlur={e => validateString(e.target.value, setTextValid)}
          />
          <Button onClick={() => onFormSubmit()} mt={5} maxWidth="20rem">
            Send message
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Container centerSection maxWidth="56rem">
      {renderContactFormContent()}
    </Container>
  );
}
