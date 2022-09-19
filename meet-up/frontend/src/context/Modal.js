import { createContext, useContext, useRef, useState, useEffect } from "react";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

const ModalProvider = (props) => {
  const [value, setValue] = useState();
  const modalRef = useRef();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {props.children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export default ModalProvider;
