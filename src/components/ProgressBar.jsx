// ProgressBar.jsx
import React from "react";
import "./ProgressBar.css";

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: this.calcPercent(props.currentStep, props.totalSteps),
    };
  }

  componentDidUpdate(prev) {
    if (prev.currentStep !== this.props.currentStep) {
      this.setState({
        percent: this.calcPercent(
          this.props.currentStep,
          this.props.totalSteps
        ),
      });
    }
  }

  // 第1步留一点小进度(stepInc*0.05)，其余均匀分布
  calcPercent(current, total) {
    if (total <= 1) return 0;
    const stepInc = 100 / (total - 1);
    return current === 1
      ? stepInc * 0.05
      : Math.min(Math.max((current - 1) * stepInc, 0), 100);
  }

  render() {
    const { percent } = this.state;
    const { currentStep, totalSteps, labels } = this.props;

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
            {labels.map((txt, i) => (
              <div
                key={i}
                className={`progress-label${
                  i === currentStep - 1 ? " active" : ""
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
}
