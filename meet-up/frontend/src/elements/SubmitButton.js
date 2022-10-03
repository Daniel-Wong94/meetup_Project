import styles from "./SubmitButton.module.css";

const SubmitButton = ({ children }) => {
  return (
    <button className={styles.submitButton} type="submit">
      {children}
    </button>
  );
};

export default SubmitButton;
