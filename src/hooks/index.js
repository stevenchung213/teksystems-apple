import { useEffect, useState } from "react";

export const useLocalStorage = (initialValue) => {
  
  const [localData, kinds, setData] = useState(initialValue);
  // const [kinds, setKinds] = useState(undefined);
  //
  useEffect(() => {
    
    const storedData = JSON.parse(localStorage.getItem('itunes'));
    
    if (storedData && Object.keys(storedData).length > 0) {
      const parsedData = JSON.parse(localStorage.getItem('itunes'));
      const localKinds = Object.keys(parsedData);
      setData({
        data: parsedData,
        kinds: localKinds
      });
      return localData;
    } else {
      localStorage.clear();
      return localData;
    }
  }, []);
};
