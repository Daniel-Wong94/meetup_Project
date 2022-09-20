import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { useState } from "react";
import styles from "./SignupForm.module.css";
import { Link } from "react-router-dom";

const SignupForm = ({ switchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setConfirmPassword("");
  };

  // for recaptcha
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "https://www.google.com/recaptcha/api.js";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, email, password };

    try {
      if (password === confirmPassword) {
        const data = await dispatch(signup(payload));
        clearForm();
        return data;
      }
    } catch (err) {
      const data = await err.json();
      setErrors(data.errors);
      console.log(errors);
      // finish validation error handling!!
    }
  };

  return (
    !sessionUser && (
      <form onSubmit={handleSignup} className={styles.signupForm}>
        <legend className={styles.signupTitle}>Sign Up</legend>
        <p>
          Already a member? <Link onClick={switchToLogin}>Log In</Link>
        </p>
        <div className={styles.signupFields}>
          <label htmlFor="firstName">
            Your First Name:
            <input
              id="firstName"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={handleFirstName}
              required
            />
          </label>
          <label htmlFor="lastName">
            Your Last Name:
            <input
              id="lastName"
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={handleLastName}
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="text"
              value={email}
              placeholder="example@email.com"
              onChange={handleEmail}
              required
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              id="passowrd"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePassword}
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleConfirmPassword}
              required
            />
          </label>
          {/* <div
            className="g-recaptcha"
            data-sitekey={"6LeYFgYiAAAAAJgbfYg5jbJtHo5Ze9p7Q1BEeTCq"}
          ></div>
          <input type="submit" value="Submit" /> */}
        </div>
        <br />
        <button type="submit">Signup</button>
      </form>
    )
  );
};

export default SignupForm;
