const Play = ({ color = "#fff", style = {}, width = "16", height = "16" }) => (
  <svg style={style} width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_103_39)">
      <path
        d="M13.5931 6.415L4.375 0.529999V15.4931L13.5894 9.5875C13.8576 9.41889 14.0787 9.18507 14.2321 8.90786C14.3855 8.63066 14.4662 8.3191 14.4665 8.00228C14.4669 7.68547 14.387 7.37372 14.2343 7.09615C14.0815 6.81858 13.861 6.58424 13.5931 6.415Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_103_39">
        <rect
          width="15"
          height="15"
          fill={color}
          transform="translate(0.5 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Play;