import React, { useState } from "react";

const SupportContext = React.createContext({
  activeSupportId: '',
  activeSupportObject: {},
  setActiveSupportId: (id: string) => {},
  setActiveSupportObject: (data: object) => {},
});

const SupportContextProvider = (props: any) => {
  const [activeSupportId, setActiveSupportId] = useState('');
  const [activeSupportObject, setActiveSupportObject] = useState({});

  const setActiveSupportIdHandler = (id: string) => {
    setActiveSupportId(id)
  }

  const setActiveSupportObjectHandler = (data: object) => {
    setActiveSupportObject(data)
  }

  const contextValue = {
    activeSupportId: activeSupportId,
    activeSupportObject: activeSupportObject,
    setActiveSupportId: setActiveSupportIdHandler,
    setActiveSupportObject: setActiveSupportObjectHandler,
  };

  return (
    <SupportContext.Provider value={contextValue}>
      {props.children}
    </SupportContext.Provider>
  );
};

export default SupportContext;
export { SupportContextProvider };