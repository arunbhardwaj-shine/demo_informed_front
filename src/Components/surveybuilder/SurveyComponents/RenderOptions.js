import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";

const RenderOptions = ({
  item,
  index,
  optionColor,
  isEdit,
  page_background_color,
}) => {
  const getTextStyle = ({ style }) => ({
    color: style.color,
  });

  const renderOption = (option, optIndex, type) => (
    <label style={{ color: optionColor }} key={optIndex} className="check">
      {option}
      <input type={type} name={item.name} disabled={!isEdit} />
      <span className="checkmark"></span>
    </label>
  );

  switch (item.type) {
    case "multiple":
      return (
        <>
          {item.answer.map((option, optIndex) =>
            renderOption(option.value, optIndex, "radio")
          )}
          {item.extra.addAllOfTheAbove && (
            <>
              {renderOption(
                item.extra.allOfTheAboveLabel,
                "allOfTheAbove",
                "radio"
              )}
            </>
          )}
          {item.addOtherChoice ? (
            <>
              {renderOption(item.extra.otherChoiceLabel, "other", "radio")}
              <div
                className="d-flex align-items-center w-100"
                style={
                  isEdit
                    ? {}
                    : {
                        backgroundColor: page_background_color,
                      }
                }
              >
                <Form.Control
                  type="text"
                  placeholder={item.extra.otherChoicePlaceholderText}
                  readOnly={!isEdit}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </>
      );
    case "checkbox":
      return (
        <>
          {item.answer.map((option, optIndex) =>
            renderOption(option.value, optIndex, "checkbox")
          )}
          {item.addOtherChoice ? (
            <>
              {renderOption(item.extra.otherChoiceLabel, "other", "checkbox")}
              <div
                className="d-flex align-items-center w-100"
                style={
                  isEdit
                    ? {}
                    : {
                        backgroundColor: page_background_color,
                      }
                }
              >
                <Form.Control
                  type="text"
                  placeholder={item.extra.otherChoicePlaceholderText}
                  readOnly={!isEdit}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </>
      );
    case "dropdown":
      return (
        //     <Select
        //       className="dropdown-basic-button split-button-dropup"
        //       placeholder={item.extra.placeholder}
        //       name={`dropdown-${index}`}
        //       options={item.answer.map((option, optIndex) => ({
        //         value: option.value,
        //         label: option.value,
        //         key: optIndex,
        //       }))}
        //     />
        //   );
        <Select
          className="dropdown-basic-button split-button-dropup"
          placeholder={item.extra.placeholder}
          name={`dropdown-${index}`}
          options={item.answer[0].value.map((option, optIndex) => ({
            value: option,
            label: option,
            key: optIndex,
          }))}
          isDisabled={!isEdit}
        />
      );
    case "freeText":
      return (
        <>
          <textarea
            name={`freeText-${index}`}
            rows="2"
            cols="50"
            placeholder={item.extra.placeholder}
            readOnly={!isEdit}
          ></textarea>
          <div className="d-flex justify-content-end word-limit">
            <span>
              {item.maxTextLength ? `${item.maxTextLength} / 50` : `0 / 50`}
            </span>
          </div>
        </>
      );
    case "matrix":
      return (
        <div className="table-responsive">
          <table className="matrix-table">
            <thead>
              <tr>
                <th></th>
                {item?.answer[0]?.answer?.map((data, colIndex) => (
                  <th key={colIndex}>{data?.value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item?.answer?.map((option, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ color: optionColor }}>{option?.title}</td>
                  {option?.answer?.map((column, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>
                      {item.extra.allowMultipleAnswer ? (
                        <input
                          type="checkbox"
                          name={`matrix-${index}-${rowIndex}-${colIndex}`}
                          disabled={!isEdit}
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`matrix-${rowIndex}-${colIndex}`}
                          disabled={!isEdit}
                        />
                      )}
                      <span className="checkmark"></span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "rating":
      return (
        <div className="d-flex align-items-start flex-column">
          <div className="d-flex flex-column">
            <div className={`rating-wrapper ${item.extra.ratingType}`}>
              {[...Array(parseInt(item.extra.ratingScale))].map(
                (_, ratingIndex) => {
                  const numberIndex = item.extra.ratingScale - ratingIndex;
                  const isStar = item.extra.ratingType === "stars";
                  const inputId = isStar
                    ? `stars-rating-${numberIndex}`
                    : `numeric-rating-${numberIndex}`;
                  const inputName = isStar ? "stars-rating" : "numeric-rating";
                  const labelClass = isStar
                    ? "stars-rating stars"
                    : "numeric-rating";
                  const labelContent = isStar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1228_31957)">
                        <path
                          d="M11.6597 0.793025C11.791 0.4645 12.209 0.4645 12.3403 0.793025L15.0391 7.54285C15.2315 8.02382 15.6711 8.36782 16.193 8.41302L23.1552 9.01592C23.3081 9.02917 23.428 9.13134 23.4785 9.29421C23.5294 9.45806 23.4917 9.63156 23.3607 9.74964L18.0665 14.5242C17.6817 14.8712 17.5205 15.4048 17.6337 15.9076L19.2378 23.0301C19.2811 23.2223 19.2053 23.381 19.0865 23.4714C18.9703 23.5599 18.828 23.5757 18.6921 23.4892L12.7213 19.6902C12.2792 19.4089 11.7208 19.4089 11.2787 19.6902L5.30791 23.4892C5.172 23.5757 5.02972 23.5599 4.91355 23.4714C4.79473 23.381 4.71894 23.2223 4.76224 23.0301L6.3663 15.9076C6.47955 15.4048 6.31834 14.8712 5.9335 14.5242L0.639264 9.74964C0.508325 9.63156 0.47065 9.45806 0.521472 9.29421C0.57199 9.13134 0.691868 9.02917 0.844809 9.01592L7.807 8.41302C8.32895 8.36782 8.76855 8.02382 8.96086 7.54285L11.6597 0.793025Z"
                          stroke={item.extra.ratingColor}
                          style={{ fill: isEdit ? "" : "none" }}
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
                  ) : (
                    numberIndex
                  );

                  return (
                    <React.Fragment key={numberIndex}>
                      <input
                        type="radio"
                        id={inputId}
                        name={inputName}
                        value={isStar ? undefined : numberIndex}
                        disabled={!isEdit}
                      />
                      <label htmlFor={inputId} className={labelClass}>
                        {labelContent}
                      </label>
                    </React.Fragment>
                  );
                }
              )}
            </div>

            <div className="rating-wrapper wrapper-label">
              <div className="not-satisfy">
                <span style={{ color: optionColor }}>
                  {item.extra.leftSideLabel ?? ""}
                </span>
              </div>
              <div className="satisfy">
                <span style={{ color: optionColor }}>
                  {item.extra.rightSideLabel ?? ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    case "heading":
      return (
        <span
          className="heading"
          style={getTextStyle(item)}
          dangerouslySetInnerHTML={{
            __html: item.question,
          }}
        />
      );
    case "paragraph":
      return (
        <p
          className="paragraph"
          style={{ color: item.style.color }}
          dangerouslySetInnerHTML={{
            __html: item.question,
          }}
        />
      );
    case "divideLine":
      return (
        <div
          className="divide-line"
          style={{
            width: `${item.style.width}%`,
            borderTop: `${item.style.height}px ${item.style.lineStyle} ${item.style.color}`,
          }}
        >
          &nbsp;
        </div>
      );
    case "image":
      return (
        <img
          src={item.question}
          alt={item.extra.altText}
          style={{ width: `${item.style.width}%`, minWidth: "10%" }}
        />
      );
    case "consent":
      return (
        <div className="login-consent">
          <p className="start-title">
            {item.question}
            <span
              style={{ pointerEvents: isEdit ? "auto" : "none" }}
              dangerouslySetInnerHTML={{
                __html: item.extra.operatingStatement,
              }}
            />
          </p>
          <div className="consent">
            <Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {item.extra.consentDetails[0].nameLabel}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={item.extra.consentDetails[0].namePlaceholder}
                  readOnly={!isEdit}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>
                  {item.extra.consentDetails[1].emailLabel}
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder={item.extra.consentDetails[1].emailPlaceholder}
                  readOnly={!isEdit}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {item.extra.consentDetails[2].countryLabel}
                </Form.Label>
                <Select
                  className="dropdown-basic-button split-button-dropup"
                  placeholder={item.extra.consentDetails.countryPlaceholder}
                  name={`consent-country`}
                  isDisabled={!isEdit}
                  options={item.extra.consentDetails[2].countryOptions.map(
                    (country, index) => ({
                      value: country,
                      label: country,
                      key: index,
                    })
                  )}
                />
              </Form.Group>
            </Row>
            <Form.Group className="consent-select">
              <Form.Label>I consent to:</Form.Label>
              {item.extra.consentOptions.map((option, index) => (
                <label className="check" key={index}>
                  {option.label}
                  <input
                    type="checkbox"
                    checked={index === 0}
                    disabled={!isEdit}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </Form.Group>
            <div
              className="page-copyright"
              style={{ pointerEvents: isEdit ? "auto" : "none" }}
              dangerouslySetInnerHTML={{ __html: item.extra.cookiePolicy }}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default RenderOptions;
