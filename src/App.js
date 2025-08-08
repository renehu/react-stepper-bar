import React from "react";
import ProgressBar from "./components/ProgressBar";
import ProgressBarFunction from "./components/ProgressBarFunction";
import ProgressBar2Step from "./components/ProgressBar2Step";
import "./App.css";

class App extends React.Component {
  state = { step: 1 };

  next = () => {
    this.setState(({ step }) => ({
      step: Math.min(step + 1, 6),
    }));
  };

  prev = () => {
    this.setState(({ step }) => ({
      step: Math.max(step - 1, 1),
    }));
  };

  render() {
    const labels = ["Step1", "Step2", "Step3", "Step4", "Step5", "Step6"];
    return (
      <>
        <div style={{ width: 600, margin: "40px auto" }}>
          React 2 step
          <ProgressBar2Step
            currentStep={this.state.step}
            totalSteps={6}
            labels={labels}
          />
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <button onClick={this.prev} disabled={this.state.step === 1}>
              Back
            </button>
            <button
              onClick={this.next}
              disabled={this.state.step === 6}
              style={{ marginLeft: 12 }}
            >
              Next
            </button>
          </div>
        </div>
        {/* <div style={{ width: 600, margin: "40px auto" }}>
          React Class
          <ProgressBar
            currentStep={this.state.step}
            totalSteps={6}
            labels={labels}
          />
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <button onClick={this.prev} disabled={this.state.step === 1}>
              Back
            </button>
            <button
              onClick={this.next}
              disabled={this.state.step === 6}
              style={{ marginLeft: 12 }}
            >
              Next
            </button>
          </div>
        </div> */}
        {/* <div style={{ width: 600, margin: "40px auto" }}>
          React Function
          <ProgressBarFunction
            currentStep={this.state.step}
            totalSteps={6}
            labels={labels}
          />
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <button onClick={this.prev} disabled={this.state.step === 1}>
              Back
            </button>
            <button
              onClick={this.next}
              disabled={this.state.step === 6}
              style={{ marginLeft: 12 }}
            >
              Next
            </button>
          </div>
        </div> */}
      </>
    );
  }
}

export default App;
