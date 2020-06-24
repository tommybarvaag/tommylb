import styled from "@emotion/styled";
import * as React from "react";
import { Box } from "./Box";
import { Typography } from "./typography";

const StyledFormGroup = styled(Box)`
  position: relative;
  padding: 1.5rem 0 0;
  margin-top: 1rem;
`;

const StyledInput = styled(Box)`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 0.1rem solid ${props => props.theme.colors.text500};
  outline: 0;
  font-size: 2rem;
  line-height: 2.6rem;
  color: ${props => props.theme.colors.text500};
  padding: 0.7rem 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: 2rem;
    cursor: text;
    top: 2rem;
  }

  ~ label,
  &:focus ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text500};
  }

  &:focus ~ label {
    color: ${props => props.theme.colors.text500};
  }

  &:focus {
    padding-bottom: 0.6rem;
    border-bottom: 0.2rem solid ${props => props.theme.colors.text500};
  }
`;

export default function Input({
  id,
  type,
  label,
  placeholder,
  error = false,
  errorText,
  onChange,
  onBlur,
  mb = 8,
  ...other
}) {
  const [value, setValue] = React.useState("");

  const handleOnChange = e => {
    setValue(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleOnBlur = e => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  return (
    <StyledFormGroup position="relative" pt={6} mt={10}>
      <StyledInput
        id={id}
        as="input"
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...other}
      />
      <label htmlFor={id}>{label ?? placeholder}</label>
      {error && (
        <Typography fontSize={0} color="#EA1B01" position="absolute" right={0} bottom={"-1.6rem"}>
          {errorText}
        </Typography>
      )}
    </StyledFormGroup>
  );
}
