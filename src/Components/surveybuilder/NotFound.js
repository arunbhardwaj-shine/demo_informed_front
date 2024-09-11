import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
            <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />
      <div className='no-found d-flex justify-content-between flex-column'>
        <div className='page-logo'>
          <img src={path_image +'informed_logo.svg'} alt="" />
        </div>
        <div className='not-found-character'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="222" height="296" viewBox="0 0 222 296" fill="none">
              <g filter="url(#filter0_d_1233_45864)">
                <path d="M211 180.014V225.46H14.1925L11 189.779L122.925 11H169.31L118.981 94.3803L68.0892 180.014H211ZM181.704 11V284.427H123.113V11H181.704Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_d_1233_45864" x="0" y="0" width="222" height="295.428" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="5.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.745098 0 0 0 0.44 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1233_45864" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1233_45864" result="shape" />
                </filter>
              </defs>
            </svg>
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="214" height="310" viewBox="0 0 214 310" fill="none">
              <g filter="url(#filter0_d_1233_45863)">
                <path d="M203 129.775V179.553C203 200.053 200.694 217.799 196.081 232.79C191.597 247.781 185.062 260.145 176.477 269.883C168.021 279.621 157.899 286.86 146.111 291.601C134.451 296.213 121.511 298.52 107.288 298.52C95.8849 298.52 85.2503 297.046 75.3844 294.099C65.5185 291.152 56.6136 286.604 48.6697 280.453C40.8539 274.175 34.1271 266.359 28.4895 257.006C22.8519 247.653 18.4955 236.506 15.4204 223.565C12.4735 210.624 11 195.953 11 179.553V129.775C11 109.018 13.2422 91.2082 17.7267 76.3453C22.3393 61.4825 28.9379 49.1822 37.5225 39.4444C46.1071 29.7067 56.2292 22.5315 67.8889 17.9189C79.6767 13.3063 92.6817 11 106.904 11C118.307 11 128.878 12.4735 138.616 15.4204C148.481 18.3674 157.386 22.9159 165.33 29.0661C173.274 35.2162 180.001 42.968 185.511 52.3213C191.148 61.6747 195.44 72.8218 198.387 85.7628C201.462 98.5756 203 113.246 203 129.775ZM143.036 187.048V121.895C143.036 112.285 142.459 103.957 141.306 96.9099C140.281 89.7347 138.744 83.6487 136.694 78.6516C134.772 73.6547 132.337 69.6186 129.39 66.5435C126.443 63.4685 123.048 61.2262 119.204 59.8168C115.488 58.2793 111.388 57.5105 106.904 57.5105C101.266 57.5105 96.2052 58.6637 91.7207 60.97C87.2362 63.2763 83.4565 66.9279 80.3814 71.9249C77.3063 76.7938 74.9359 83.3924 73.2703 91.7207C71.7327 99.9209 70.964 109.979 70.964 121.895V187.048C70.964 196.658 71.4765 205.05 72.5015 212.225C73.6547 219.4 75.1922 225.551 77.1141 230.676C79.1642 235.673 81.6627 239.773 84.6096 242.976C87.5566 246.051 90.952 248.293 94.7958 249.703C98.6396 251.112 102.804 251.817 107.288 251.817C112.926 251.817 117.923 250.728 122.279 248.55C126.636 246.243 130.351 242.592 133.426 237.595C136.63 232.469 139 225.743 140.538 217.414C142.203 209.086 143.036 198.964 143.036 187.048Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_d_1233_45863" x="0" y="0" width="214" height="309.52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="5.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.745098 0 0 0 0.44 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1233_45863" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1233_45863" result="shape" />
                </filter>
              </defs>
            </svg>

          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="224" height="302" viewBox="0 0 224 302" fill="none">
              <g filter="url(#filter0_d_1233_45866)">
                <path d="M212.531 191.616L206.207 236.62L11.3143 209.229L13.1187 173.452L148.836 11.989L194.769 18.4446L133.326 94.0091L71.0114 171.727L212.531 191.616ZM207.043 20.1695L168.989 290.936L110.968 282.782L149.022 12.0152L207.043 20.1695Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_d_1233_45866" x="0.314453" y="0.988281" width="223.217" height="300.947" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="5.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.745098 0 0 0 0.44 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1233_45866" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1233_45866" result="shape" />
                </filter>
              </defs>
            </svg>
          </span>
        </div>
        <div className='not-found-txt'>
          <h3>There is no active survey on this page. </h3>
          <h4>As a favour can you let us know via email how you came to this page?</h4>
          <Link to="mailto:support@docintel.app" className="btn-white">Send email</Link>
        </div>
      </div>
    </>
  )
}

export default NotFound