// ProgressBarFunction.js
import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ currentStep, totalSteps, labels }) {
  const [percent, setPercent] = useState(calcPercent(currentStep, totalSteps));

  useEffect(() => {
    setPercent(calcPercent(currentStep, totalSteps));
  }, [currentStep, totalSteps]);

  // 第1步留一点小进度(stepInc*0.05)，其余均匀分布
  function calcPercent(current, total) {
    if (total <= 1) return 0;
    const stepInc = 100 / (total - 1);
    return current === 1
      ? stepInc * 0.05
      : Math.min(Math.max((current - 1) * stepInc, 0), 100);
  }

  // 当前激活标签文本
  const activeLabel = labels ? labels[currentStep - 1] : null;

  return (
    <div className="progress-container">
      <div className="progress-top">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="progress-counter">
          {currentStep}/{totalSteps}
        </div>
      </div>

      {labels && (
        <div className="progress-labels">
          {labels.map((txt) => (
            <div
              key={txt}
              className={`progress-label${
                txt === activeLabel ? " active" : ""
              }`}
            >
              {txt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
