import React from "react";

const CommonSurveyStarRating = ({ data }) => {
  const totalStars = 5;
  const ratingValue = data || 0; // Default to 0 if no rating is available

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill={index < ratingValue ? "#70899E" : "none"} // Fill if the star is within the rating value
          stroke={index < ratingValue ? "70899E" : "#000"} // Change the stroke color for the filled stars
        >
          <g clipPath="url(#clip0_1228_31957)">
            <path
              d="M11.6597 0.793025C11.791 0.4645 12.209 0.4645 12.3403 0.793025L15.0391 7.54285C15.2315 8.02382 15.6711 8.36782 16.193 8.41302L23.1552 9.01592C23.3081 9.02917 23.428 9.13134 23.4785 9.29421C23.5294 9.45806 23.4917 9.63156 23.3607 9.74964L18.0665 14.5242C17.6817 14.8712 17.5205 15.4048 17.6337 15.9076L19.2378 23.0301C19.2811 23.2223 19.2053 23.381 19.0865 23.4714C18.9703 23.5599 18.828 23.5757 18.6921 23.4892L12.7213 19.6902C12.2792 19.4089 11.7208 19.4089 11.2787 19.6902L5.30791 23.4892C5.172 23.5757 5.02972 23.5599 4.91355 23.4714C4.79473 23.381 4.71894 23.2223 4.76224 23.0301L6.3663 15.9076C6.47955 15.4048 6.31834 14.8712 5.9335 14.5242L0.639264 9.74964C0.508325 9.63156 0.47065 9.45806 0.521472 9.29421C0.57199 9.13134 0.691868 9.02917 0.844809 9.01592L7.807 8.41302C8.32895 8.36782 8.76855 8.02382 8.96086 7.54285L11.6597 0.793025Z"
              stroke={index < ratingValue ? "70899E" : "#000"}
            />
          </g>
          <defs>
            <clipPath id="clip0_1228_31957">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.046875)"
              />
            </clipPath>
          </defs>
        </svg>
      ))}
    </div>
  );
};

export default CommonSurveyStarRating;