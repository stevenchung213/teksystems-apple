import { useState, useEffect } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  
  return {
    value, setValue,
    reset: () => setValue(''),
    props: {
      value,
      onChange: e => {
        setValue(e.target.value);
      }
    }
  }
};
