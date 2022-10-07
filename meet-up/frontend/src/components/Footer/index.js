import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const sessionUser = useSelector((state) => state?.session?.user);

  const handleSendEmail = (e) =>
    window.open("mailto:daniel.kachun.wong@gmail.com");

  return (
    <div className={styles.footerContainer}>
      <div className={styles.heading}>
        Create your own Meetup group. <Link to="/">Get Started</Link>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.linkContainer}>
          {sessionUser && (
            <ul className={styles.links}>
              <li>Your Account</li>

              <Link to={"/profile/settings/edit-profile"}>Settings</Link>
              <Link to={""}>Log Out</Link>
            </ul>
          )}
          {/* <Link to={""}>Help</Link> */}
          {/* <Link to={""}>Become an Affiliate</Link> */}
        </div>
        <div className={styles.linkContainer}>
          <ul className={styles.links}>
            <li>Discover</li>
            <Link to={"/discover/groups"}>Groups</Link>
            {/* <Link to={""}>Calendar</Link> */}
            {/* <Link to={""}>Topics</Link> */}
            {/* <Link to={""}>Cities</Link> */}
            <Link to={"/discover/events"}>Online Events</Link>
            {/* <Link to={""}>Local Guides</Link> */}
          </ul>
        </div>
        <div className={styles.linkContainer}>
          <ul className={styles.links}>
            <li>About</li>
            {/* <Link to={"/about"}>About</Link> */}
            {/* <Link to={""}>Blog</Link> */}
            {/* <Link to={""}>Meetup Pro</Link> */}
            {/* <Link to={""}>Careers</Link> */}
            {/* <Link to={""}>Apps</Link> */}
            {/* <Link to={""}>Podcast</Link> */}
            <a href="https://github.com/Daniel-Wong94">Github</a>
            <a href="https://www.linkedin.com/in/daniel-kachun-wong/">
              LinkedIn
            </a>
            <a href="/homepage/groups" onClick={handleSendEmail}>
              Email
            </a>
          </ul>
        </div>
      </div>
      {/* <div className={styles.socialMedia}>
        <div>Follow us</div>
        <ul className={styles.socialMediaLinks + " " + styles.links}>
          <a href="https://www.linkedin.com/in/daniel-kachun-wong/">LinkedIn</a>
          <Link to={""}>T</Link>
          <Link to={""}>Y</Link>
          <Link to={""}>I</Link>
          <Link to={""}>T</Link>
        </ul>
      </div> */}
      <div className={styles.termsPolicies}>
        <ul className={styles.termsPoliciesLinks + " " + styles.links}>
          <li>© 2022 Meetup Clone</li>
          {/* <Link to={""}>Terms of Service</Link> */}
          {/* <Link to={""}>Privacy Policy</Link> */}
          {/* <Link to={""}>Cookie Policy</Link> */}
          {/* <Link to={""}>Help</Link> */}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
