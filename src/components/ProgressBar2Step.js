// ProgressBarFunction.js
import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ currentStep, totalSteps, labels }) {
  function calcPercent(current, total) {
    if (total <= 1) return 0;
    const stepInc = 100 / (total - 1);
    return current === 1
      ? stepInc * 0.05
      : Math.min(Math.max((current - 1) * stepInc, 0), 100);
  }

  // 上一个 step 的百分比
  const prevPercent = calcPercent(Math.max(0, currentStep - 1), totalSteps);
  // 当前 step 的百分比
  const currPercent = calcPercent(currentStep, totalSteps);

  // 用 state 控制 width
  const [percent, setPercent] = useState(prevPercent);

  useEffect(() => {
    // 先显示上一个 step 的宽度
    setPercent(prevPercent);

    // 半秒后更新为当前 step 的宽度
    const timer = setTimeout(() => {
      setPercent(currPercent);
    }, 500);

    return () => clearTimeout(timer);
  }, [prevPercent, currPercent]);

  // 当前激活标签
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
