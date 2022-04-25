import "../sub-rules/rules.styles.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Context } from "../../contexts/store";

export default function SubRules(props) {
  const [currentIndex, setCurrentIndex] = useState();
  const [state] = useContext(Context);
  const [currentRules, setCurrentTopics] = useState([]);

  const { subName } = useParams();

  const toggleRule = (id) => {
    if (currentIndex === id) {
      setCurrentIndex();
    } else {
      setCurrentIndex(id);
    }
  };

  useEffect(() => {
    if (state.subRedditData.length > 0) {
      setCurrentTopics(JSON.parse(state.subRedditData[0].rules));
    }
  }, [state.subRedditData]);

  console.log(currentRules);

  return (
    <div className="rule-container">
      <div className="rules-header">
        <span className="about-header-text">r/{subName} Rules</span>
      </div>
      {currentRules.map((rule) => {
        return (
          <div className="rule-item" key={rule.ruleId}>
            <div
              className="rule-header"
              onClick={() => toggleRule(rule.ruleId)}
            >
              <div className="rule-title">
                <div className="rule-number">
                  {currentRules.indexOf(rule) === 0
                    ? currentRules.indexOf(rule) + 1
                    : currentRules.indexOf(rule)}
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
    </div>
  );
}
