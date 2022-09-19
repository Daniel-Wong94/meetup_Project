import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginInfo = { email, password };
    clearForm();

    try {
      const user = await dispatch(login(loginInfo));
      return user;
    } catch (err) {
      const data = await err.json();
      if (data.message === "Validation error") setErrors(data.errors);
      if (data.message === "Invalid credentials")
        setErrors({ [data.message]: data.errors[0] });
    }
  };

  return (
    !sessionUser && (
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <legend className={styles.loginTitle}>Log In</legend>
        <p>
          Not a member yet? <Link to="/signup">Sign Up</Link>
        </p>
        <div className={styles.loginFields}>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="text"
              value={email}
              placeholder="Email"
              onChange={handleEmail}
            />
            <div className={styles.validationError}>{errors.email}</div>
          </label>
          <label htmlFor="password">
            Password:
            <input
              id="passowrd"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePassword}
            />
            <div className={styles.validationError}>{errors.password}</div>
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    )
  );
};

export default LoginForm;
