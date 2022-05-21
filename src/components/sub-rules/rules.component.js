import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import axios from "axios";
import "../sub-rules/rules.styles.css";

export default function SubRules() {
  const [currentIndex, setCurrentIndex] = useState();
  const state = useSelector((state) => state);
  const [currentRules, setCurrentTopics] = useState([]);
  const [addRule, toggleAddRule] = useState(false);
  const isUserAdmin = state.subRedditData[0]?.admin === state.user?.userId;
  const { subId, subName } = useParams();

  const initialValues = {
    ruleParentId: subId,
    ruleTitle: "",
    ruleDescription: "",
  };

  const validationSchema = yup.object({
    ruleTitle: yup
      .string("Please enter a rule name")
      .min(1, "Name must be more than 2 characters or more")
      .max(100, "Name must be 100 characters or less")
      .required("Name is required"),
    ruleDescription: yup
      .string("Please enter a rule description")
      .min(1, "Description must be more than 1 character long")
      .max(500, "Description must be 100 characters or less")
      .required("Description is required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/reddit/AddRule",
        values
      );
      if (response.status === 200) {
        setCurrentTopics([...currentRules, response.data]);
        toggleAddRule();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errorMessages);
      } else {
        console.log(error.message);
      }
    }
  };

  const toggleRule = (id) => {
    if (currentIndex === id) {
      setCurrentIndex();
    } else {
      setCurrentIndex(id);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (
      state.subRedditData.length > 0 &&
      state.subRedditData[0].rules !== null
    ) {
      setCurrentTopics(JSON.parse(state.subRedditData[0].rules));
    } else {
      setCurrentTopics([]);
    }
  }, [state.subRedditData]);

  return (
    <div className="rule-container">
      <div className="rules-header">
        <span className="about-header-text">r/{subName} Rules</span>
        {isUserAdmin === true ? (
          <div
            className="add-rule-icon"
            onClick={() => toggleAddRule(!addRule)}
          >
            <MdAdd color="#fff" />
          </div>
        ) : null}
      </div>
      {addRule && (
        <>
          <form
            className="add-rule-form"
            id="add-rule-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="input-container">
              <input
                type="text"
                id="ruleTitle"
                className="user-form-input"
                value={formik.values.ruleTitle}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <span className="secondary-form-label">Rule</span>
              {formik.touched.ruleTitle && formik.errors.ruleTitle ? (
                <div className="form-error">{formik.errors.ruleTitle}</div>
              ) : null}
            </div>
            <div className="input-container">
              <textarea
                type="text"
                id="ruleDescription"
                className="user-form-input"
                value={formik.values.ruleDescription}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <span className="secondary-form-label">Description</span>
              {formik.touched.ruleDescription &&
              formik.errors.ruleDescription ? (
                <div className="form-error">
                  {formik.errors.ruleDescription}
                </div>
              ) : null}
            </div>
          </form>
          <div className="form-footer-rules">
            <button
              form="add-rule-form"
              className="btn btn--full rule-btn-cancel"
              type="button"
              onClick={() => toggleAddRule(!addRule)}
            >
              Cancel
            </button>
            <button
              form="add-rule-form"
              type="submit"
              className="btn btn--full rule-btn"
            >
              Add Rule
            </button>
          </div>
        </>
      )}
      {currentRules.map((rule) => {
        return (
          <div className="rule-item" key={rule.ruleId}>
            <div
              className="rule-header"
              onClick={() => toggleRule(rule.ruleId)}
            >
              <div className="rule-title">
                <div className="rule-number">
                  {currentRules.indexOf(rule) + 1}.
                </div>
                {rule.ruleTitle}{" "}
              </div>
              <HiOutlineChevronDown className="rules-icon" />
            </div>
            {currentIndex === rule.ruleId ? (
              <ul className="subpoint-table">
                <li className="subpoint">{rule.ruleDescription}</li>
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
