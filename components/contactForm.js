import React from "react";

export default function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");

  const onFormSubmit = e => {
    if (name && email && text) {
      e.preventDefault();
      setSubmitting(true);
      fetch(".netlify/functions/sendMail", {
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
          <h2 className="title">Thank you!</h2>
          <p className="description">You'll hear from me soon.</p>
          <style jsx>{`
            .title {
              margin: 0;
              width: 100%;
              padding-top: 80px;
              font-size: 3.6rem;
            }

            .description {
              font-size: 2.2rem;
              color: rgb(78, 78, 80);
            }
          `}</style>
        </>
      );
    }

    return (
      <>
        <h2 className="title">Let’s have a chat</h2>
        <p className="description">
          I’m always happy to talk about working together, new opportunities or just catching up. If you’d like to get in touch, just shoot me an email with the
          link below.
        </p>
        <form>
          <input name="name" type="text" className="contact-form-input" placeholder="Full name" onChange={event => setName(event.target.value)} required />
          <input
            name="email"
            type="email"
            className="contact-form-input"
            placeholder="Email address"
            onChange={event => setEmail(event.target.value)}
            required
          />
          <textarea
            name="text"
            className="contact-form-input contact-form-text-area"
            placeholder="Hey Tommy, I'm interested in chatting about a role we have available..."
            onChange={event => setText(event.target.value)}
            required
          />
          <input className="contact-form-submit-button" type="submit" value="Send message" onClick={onFormSubmit} />
        </form>
        <style jsx>{`
          .contact-form {
            max-width: 78.4rem;
            margin: 0 auto;
            text-align: center;
          }

          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            font-size: 3.6rem;
          }

          .description {
            font-size: 2.2rem;
            color: rgb(78, 78, 80);
          }

          .contact-form-input {
            font-weight: 500;
            font-size: 1.6rem;
            border-radius: 4px;
            border: 1px solid #000000;
            transition: all 0.3s;
            padding: 13px;
            margin-bottom: 16px;
            width: 100%;
            box-sizing: border-box;
            outline: 0;
          }

          .contact-form-input:focus {
            border: 1px solid #000000;
          }

          .contact-form-text-area {
            height: 150px;
            resize: vertical;
            font-family: Arial, Helvetica, sans-serif;
          }

          .contact-form-submit-button {
            width: auto;
            background: #000000;
            border: 1px solid #000000;
            border-radius: 4px;
            cursor: pointer;
            color: white;
            font-size: 1.6rem;
            transition: all 0.3s;
            padding: 1em 1.5em 1.05em;
            min-width: 7rem;
          }

          .contact-form-submit-button:hover {
            background: #333333;
          }
        `}</style>
      </>
    );
  };

  return (
    <div className="contact-form">
      {renderContactFormContent()}
      <style jsx>{`
        .contact-form {
          max-width: 78.4rem;
          margin: 0 auto;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
