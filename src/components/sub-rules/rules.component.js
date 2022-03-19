import "../sub-rules/rules.styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

export default function SubRules(props) {
  const [currentIndex, setCurrentIndex] = useState();

  const toggleRule = (id) => {
    if (currentIndex === id) {
      setCurrentIndex();
    } else {
      setCurrentIndex(id);
    }
  };
  const rules = props.rules;

  return (
    <>
      {rules.map((rule) => {
        return (
          <div className="rule-container" key={rule.ruleNumber}>
            <div
              className="rule-header"
              onClick={() => toggleRule(rule.ruleNumber)}
            >
              <div className="rule-title">
                <div className="rule-number">{rule.ruleNumber}.</div>
                {rule.ruleTitle}{" "}
              </div>
              <HiOutlineChevronDown className="accordian-icon" />
            </div>
            {currentIndex === rule.ruleNumber ? (
              <ul className="subpoint-table">
                <li className="subpoint">{rule.subPointOne}</li>
                <li className="subpoint">{rule.subPointTwo}</li>
                <li className="subpoint">{rule.subPointThree}</li>
              </ul>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
