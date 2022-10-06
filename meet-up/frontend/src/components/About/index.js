const About = () => {
  const handleSendEmail = (e) => {
    e.preventDefault();
    window.open("mailto:daniel.kachun.wong@gmail.com");
  };

  return (
    <div>
      <button onClick={handleSendEmail}>Click Here</button>
    </div>
  );
};

export default About;
