import React from "react";
import Button from "./button";
import Heading from "./heading";
import Text from "./text";

export default function ContactForm({ ...other }) {
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
          <Heading>Thank you!</Heading>
          <Text>You'll hear from me soon.</Text>
        </>
      );
    }

    return (
      <div className="p-6 my-4 w-full border border-black dark:border-white rounded-xl">
        <Heading>Let’s have a chat</Heading>
        <Text>
          I’m always happy to talk about working together, new opportunities or just a friendly
          hello.
        </Text>
        <form className="relative my-4" onSubmit={e => e.preventDefault()}>
          <label className="block text-sm text-gray-900 dark:text-gray-100" htmlFor="full-name">
            Name
          </label>
          <input
            id="full-name"
            className="px-4 py-2 mt-1 my-6 focus:ring-blue-500 border focus:border-blue-500 block w-full border-gray-800 dark:border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Full name"
            type="text"
            onChange={e => {
              setName(e.target.value);
              validateString(e.target.value, setNameValid);
            }}
            onBlur={e => validateString(e.target.value, setNameValid)}
            required
          />
          <label className="block text-sm text-gray-900 dark:text-gray-100" htmlFor="email-address">
            Email address
          </label>
          <input
            id="email-address"
            className="px-4 py-2 mt-1 my-6 focus:ring-blue-500 border focus:border-blue-500 block w-full border-gray-800 dark:border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="your@email.com"
            type="email"
            onChange={e => {
              setEmail(e.target.value);
              validateEmail(e.target.value, setEmailValid);
            }}
            onBlur={e => validateEmail(e.target.value, setEmailValid)}
            required
          />
          <label className="block text-sm text-gray-900 dark:text-gray-100" htmlFor="email-address">
            Text
          </label>
          <textarea
            id="text"
            className="px-4 py-2 mt-1 my-6 focus:ring-blue-500 border focus:border-blue-500 block w-full border-gray-800 dark:border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Hey Tommy, I'm interested in chatting about a role we have available..."
            rows="6"
            onChange={e => {
              setText(e.target.value);
              validateString(e.target.value, setTextValid);
            }}
            onBlur={e => validateString(e.target.value, setTextValid)}
            required
          />
          <Button onClick={() => onFormSubmit()}>Send message</Button>
        </form>
      </div>
    );
  };

  return (
    <div className="w-full" {...other}>
      {renderContactFormContent()}
    </div>
  );
}
