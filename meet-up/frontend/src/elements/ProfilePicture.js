const ProfilePicture = ({ handleOpenMenu, initials }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 75 74"
      version="1.1"
      width="48"
      height="48"
      className="m1lpvvm2"
      onClick={handleOpenMenu || null}
    >
      <title>beach</title>
      <desc>Created with Sketch.</desc>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-750.000000, -109.000000)">
          <g transform="translate(787.926915, 146.475953) rotate(-120.000000) translate(-787.926915, -146.475953) translate(750.426915, 110.475953)">
            <g transform="translate(0.350000, 0.000000)">
              <path
                d="M35.66773,0.88851 C16.15488,0.88851 0.33628,16.70676 0.33628,36.21961 C0.33628,55.73246 16.15488,71.55106 35.66773,71.55106 C55.18093,71.55106 70.99918,55.73246 70.99918,36.21961 C70.99918,16.70676 55.18093,0.88851 35.66773,0.88851 L35.66773,0.88851 Z"
                fill="#F1A080"
              ></path>
              <path
                d="M38.117625,0.188335 C18.604775,0.188335 2.786525,16.006935 2.786525,35.519785 C2.786525,55.032635 18.604775,70.850885 38.117625,70.850885 C57.630825,70.850885 73.449075,55.032635 73.449075,35.519785 C73.449075,16.006935 57.630825,0.188335 38.117625,0.188335 Z"
                stroke="#353E48"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <text
                transform="rotate(120 38,36)"
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="#333E48"
                fontSize="30px"
                dy=".3em"
              >
                {initials}
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ProfilePicture;
