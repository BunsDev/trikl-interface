import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    label,
    errorMessage,
    onChange,
    id,
    TagType,
    classNameFromInput,
    ...inputProps
  } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="flex flex-col w-full gap-2 text-left">
      <label className="text-lightViolet text-base tracking-widest font-light">
        {label}
      </label>

      <TagType
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        className={
          classNameFromInput ||
          `rounded-lg text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700 ${
            focused ? "invalid:border-red-400" : ""
          } peer`
        }
      />
      <div
        className={`text-xs text-red-400 font-light
      hidden ${focused ? "peer-invalid:block" : ""}`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default FormInput;
