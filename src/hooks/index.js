import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  
  const initialState = () => {
    if (localStorage.getItem('itunes') &&
      Object.keys(JSON.parse(localStorage.getItem('itunes'))).length > 0) {
      console.log('LOCAL STORAGE')
      return JSON.parse(localStorage.getItem('itunes'));
    } else {
      console.log('STORAGE CLEARED in ELSE')
      // localStorage.clear();
      // return {};
    }
  };
  let [localData, setData] = useState(initialState);
  console.log('initial state',localData)
  const addMedia = (media, kind) => {
    // console.log('addmedia', media, kind, localData)
    if (localData === null || localData === undefined) {
      console.log('add1')
      localData = {};
      localData[kind] = [];
      localData[kind].push(media);
      console.log('addmedia2', localData)
    }
    if (!localData[kind]) {
      console.log('add2')
      localData[kind] = [];
      localData[kind].push(media);
      console.log('add2', localData)
    }
    if (Array.isArray(localData[kind])) {
      console.log('add3')
      const filtered = localData[kind].filter(item => item.url === media.url);
      console.log('add3',filtered)
      if (filtered.length === 0) {
        localData[kind].push(media);
        console.log('add3', localData)
      }
    }
    return setData(localData);
  };
  const deleteMedia = (media, kind) => {
    console.log('deletemedia')
    const filtered = localData[kind].filter(localMedia => localMedia.url !== media.url);
    console.log(filtered)
    if (filtered.length === 0) {
      delete localData[kind];
    } else {
      localData[kind] = filtered;
    }
    return setData(localData);
  };
  
  useEffect(() => {
    console.log('inside hook useEffect');
    console.log(localData);
    return localStorage.setItem('itunes', JSON.stringify(localData));
  }, []);
  
  return { localData, addMedia, deleteMedia };
};
