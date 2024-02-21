"use client";
import "../input/styles.scss";
import { TextFieldProps } from "@mui/material/TextField";
import { ChangeEvent, use, useState } from "react";

export const Input = ({
  helperText,
  error,
  multiline,
  ...props
}: TextFieldProps) => {
  return (
    <>
      {multiline ? (
        // @ts-ignore
        <textarea
          {...props}
          className="input"
          style={{
            ...props.style,
          }}
        />
      ) : (
        // @ts-ignore
        <input {...props} className="input" />
      )}
    </>
  );
};
export const InputIcon = ({ onChange, ...props }: any) => {
  const [input, setInput] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let number = input;
      const newNumber = Number.parseInt(e.target.value.toString());
      if (newNumber >= 0 && newNumber <= 9) {
        number = newNumber.toString();
        onChange(number);
        setInput(number);
      } else if (e.target.value.toString() === "") {
        setInput("");
        onChange("");
      }
    } catch (error) {}
  };
  return (
    //@ts-ignore
    <input
      {...props}
      value={input}
      onChange={handleChange}
      style={{
        margin: "0px 10px",
        borderRadius: "50px",
        width: "50px",
        height: "50px",
      }}
      className="input"
    />
  );
};
