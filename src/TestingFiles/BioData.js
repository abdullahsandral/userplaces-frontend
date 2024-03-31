import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
import classes from "./BioData.module.css";
import "react-calendar/dist/Calendar.css";

const BioData = (props) => {
  const provinces = ["AJK", "Balochistan", "GB", "KPK", "Sindh", "Punjab"];
  const qualification = [
    "Matric",
    "Intermediate",
    "Graduation",
    "Masters",
    "PhD",
  ];
  const games = ["Cricket", "Hockey", "Volleyball", "Baseball", "Football"];

  const inputRef = useRef();
  const gamesRef = useRef();

  const [showCalendar, setShowCalendar] = useState();
  const [showGames, setShowGames] = useState();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState();

  const [formState, setFormState] = useState({
    fName: "",
    lName: "",
    image: "",
    CNIC: "",
    CNICDate: "",
    phNumber: "",
    email: "",
    province: "",
    relegion: "",
    description: "",
    qualification: "",
    DOB: "Please Choose Your Date Of Birth",
    languages: [],
    gender: "",
    password: "",
    cPassword: "",
    games: [],
  });

  const inputChangeHandler = (e, id) => {
    if (!id) return;
    const pState = { ...formState };
    pState[id] = e.target ? e.target.value : e;
    console.log(pState[id]);
    setFormState(pState);
  };

  const inputElement = (
    id,
    label,
    placeholder,
    min,
    max,
    type,
    req,
    pattren
  ) => {
    return (
      <div className={classes.inputDiv}>
        <label htmlFor={id}>{label}</label>
        <input
          placeholder={placeholder}
          minLength={min}
          maxLength={max}
          id={id}
          name={id}
          type={type}
          required={req}
          pattern={pattren}
          list={id + "list"}
          onChange={(e) => inputChangeHandler(e, id)}
        />
      </div>
    );
  };

  const checkboxHandler = (e) => {
    const pState = { ...formState };
    const exist = pState.languages.find((v, i, a) => {
      if (v === e.target.value) {
        a.splice(i, 1);
        return true;
      } else return false;
    });
    if (!exist) pState.languages.push(e.target.value);

    setFormState(pState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const pickImageHandler = () => {
    inputRef.current.click();
  };

  const imageChangeHandler = () => {
    setShowProgress(true);
    setProgress(0);
    console.log(progress);

    const file = inputRef.current.files[0];
    const fileReader = new FileReader();

    const pState = { ...formState };

    fileReader.onprogress = (e) => {
      setProgress(((e.loaded / e.total) * 100).toFixed(0));
    };

    fileReader.onloadend = (e) => {
      pState.image = fileReader.result;
      setFormState(pState);
      setShowProgress(false);
    };
    if (file) fileReader.readAsDataURL(file);
  };

  const createCheckboxOrRadioInput = (type, id, name, value, label) => {
    return (
      <>
        <input type={type} id={id} name={name} value={value} />
        <label htmlFor={id}>{label}</label> <br />
      </>
    );
  };

  const gamesSelector = () => {
    if (gamesRef.current) {
      inputChangeHandler(
        [...gamesRef.current.selectedOptions].map((op) => op.value),
        "games"
      );
      setShowGames(!showGames);
    }
  };
  return (
    <>
      <div className={classes.outerDiv}>
        <input
          ref={inputRef}
          type="file"
          onChange={imageChangeHandler}
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
        ></input>
        <form onSubmit={submitHandler}>
          <h3>Enter Your Bio Data</h3>
          <div className={classes.imgChooser} onClick={pickImageHandler}>
            {formState.image && !showProgress ? (
              <img src={formState.image} alt="DP" />
            ) : (
              <b>Please Choose an Image</b>
            )}
            {showProgress && (
              <div className={classes.Progress}>
                <div style={{ width: progress + "%" }}>
                  <b>{progress}%</b>
                </div>
              </div>
            )}
          </div>
          {inputElement(
            "fName",
            "First Name",
            "Enter Your First Name",
            5,
            40,
            "text",
            true
          )}
          {inputElement(
            "lName",
            "Last Name",
            "Enter Your Last Name",
            5,
            40,
            "text",
            true
          )}
          {inputElement(
            "CNIC",
            "CNIC",
            "XXXXX-XXXXXXX-X",
            15,
            15,
            "text",
            true,
            "^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$"
          )}
          {inputElement(
            "CNICDate",
            "CNIC Issuance Date and Time",
            "Please Choose A Date and Time",
            5,
            15,
            "datetime-local",
            true
          )}

          {inputElement(
            "phNumber",
            "Mobile",
            "03xx-xxxxxxx",
            12,
            12,
            "text",
            true,
            "03[0-9]{2}-[0-9]{7}"
          )}
          {inputElement(
            "email",
            "Email",
            "Enter Your Email",
            5,
            50,
            "email",
            true
          )}

          <div className={classes.selector}>
            <label>Select Your Province or State</label>
            <select
              required
              value={formState.province}
              onChange={(e) => inputChangeHandler(e, "province")}
            >
              <option value="">Select Your Province</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className={classes.games}>
            <label>Select Your Faviourites Games </label>
            <div>
              <span onClick={() => setShowGames(!showGames)}>
                {formState.games.length <= 0
                  ? "Please Select Games"
                  : formState.games.join()}
              </span>
              <button type="button" onClick={gamesSelector}>
                Select
              </button>
            </div>
            {showGames && (
              <select ref={gamesRef} multiple>
                {games.map((game) => (
                  <option key={game} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            )}
          </div>

          <fieldset>
            <legend>Relegion:</legend>
            <div
              className={classes.fieldsetDiv}
              onChange={(e) => inputChangeHandler(e, "relegion")}
            >
              {createCheckboxOrRadioInput(
                "radio",
                "islam",
                "relegion",
                "Islam",
                "Islam"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "christianity",
                "relegion",
                "Christianity",
                "Christianity"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "hinduism",
                "relegion",
                "Hinduism",
                "Hinduism"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "buddhism",
                "relegion",
                "Buddhism",
                "Buddhism"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "sikhism",
                "relegion",
                "Sikhism",
                "Sikhism"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "atheist",
                "relegion",
                "Atheist",
                "Atheist"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "Other",
                "relegion",
                "Other",
                "Other"
              )}
            </div>
          </fieldset>

          <div>
            {inputElement(
              "qualification",
              "Enter Your Highest Qualification",
              "Highest Qualification",
              2,
              50,
              "tetx",
              true
            )}
            <datalist id="qualificationlist">
              {qualification.map((q) => (
                <option key={q} value={q} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Choose Your DOB</label>
            <div className={classes.dob}>
              <p
                onClick={() => setShowCalendar(!showCalendar)}
                style={{ width: "100%" }}
              >
                {formState.DOB || "Choose a Date"}{" "}
              </p>
              {showCalendar && (
                <Calendar
                  className={classes.calendar}
                  onClickDay={(d) => {
                    setShowCalendar(!showCalendar);
                    inputChangeHandler(d.toLocaleDateString("en-GB"), "DOB");
                  }}
                  minDate={props.minDate || new Date("1971, 12, 16")}
                />
              )}
            </div>
          </div>
          <fieldset>
            <legend>Favourite Languages:</legend>
            <div onChange={checkboxHandler} className={classes.fieldsetDiv}>
              {createCheckboxOrRadioInput(
                "checkbox",
                "JavaScript",
                "JavaScript",
                "Java Script",
                "Java Script"
              )}
              {createCheckboxOrRadioInput(
                "checkbox",
                "React",
                "React",
                "React",
                "React JS"
              )}
              {createCheckboxOrRadioInput(
                "checkbox",
                "Node",
                "Node",
                "Node",
                "Node JS"
              )}
              {createCheckboxOrRadioInput(
                "checkbox",
                "Python",
                "Python",
                "Python",
                "Python"
              )}
              {createCheckboxOrRadioInput("checkbox", "C", "C", "C", "C, C++")}
            </div>
          </fieldset>

          <div className={classes.tArea}>
            <label>Description</label>
            <textarea
              value={formState.description}
              onChange={(e) => inputChangeHandler(e, "description")}
              rows={5}
            ></textarea>
          </div>

          {inputElement(
            "password",
            "Password",
            "Enter Your Password",
            5,
            50,
            "password",
            true
          )}
          {inputElement(
            "cPassword",
            "Conform Password",
            "Conform Your Password",
            5,
            50,
            "password",
            true
          )}

          <fieldset>
            <legend>Gender:</legend>
            <div
              className={classes.fieldsetDiv}
              onChange={(e) => inputChangeHandler(e, "gender")}
            >
              {createCheckboxOrRadioInput(
                "radio",
                "male",
                "gender",
                "Male",
                "Male"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "female",
                "gender",
                "Female",
                "Female"
              )}
              {createCheckboxOrRadioInput(
                "radio",
                "other",
                "gender",
                "Other",
                "Other"
              )}
            </div>
          </fieldset>

          <button className={classes.submitBtn} type="submit">
            SUBMIT DATA
          </button>
        </form>
      </div>
    </>
  );
};
export default BioData;
