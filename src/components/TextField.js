import { TextInput } from "@mantine/core";
import React from "react";

const TextField = ({ label, inputProps, onChange, value }) => {
  return (
    <div>
      <TextInput
        placeholder='Your name'
        label={label}
        {...inputProps}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
