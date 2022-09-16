import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) history.push("/");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    const loginInfo = { email, password };

    try {
      const user = await dispatch(login(loginInfo));
      return user;
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) setErrors(data.errors);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <legend className={styles.loginTitle}>Log In</legend>
      <p>Not a member yet? Sign Up</p>
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
          {errors.email && <div>{errors.email}</div>}
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
          {errors.password && <div>{errors.password}</div>}
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginFormPage;
