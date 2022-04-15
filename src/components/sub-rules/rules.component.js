import "../sub-rules/rules.styles.css";
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
          <div className="rule-container" key={rule.ruleId}>
            <div
              className="rule-header"
              onClick={() => toggleRule(rule.ruleId)}
            >
              <div className="rule-title">
                <div className="rule-number">
                  {rules.indexOf(rule) === 0
                    ? rules.indexOf(rule) + 1
                    : rules.indexOf(rule)}
                  .
                </div>
                {rule.ruleTitle}{" "}
              </div>
              <HiOutlineChevronDown className="accordian-icon" />
            </div>
            {currentIndex === rule.ruleId ? (
              <ul className="subpoint-table">
                <li className="subpoint">{rule.ruleDescription}</li>
              </ul>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
