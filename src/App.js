import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [stepNo, setStepNo] = useState(1);
  const [nextStep, setNextStep] = useState(2);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0
  });
  const stepsRef = useRef([]);

  const steps = [
    {
      step: "Odered",
      description: "Yor Order is Succesfully placed"
    },
    {
      step: "Dispatched",
      description: "Package is dispatched"
    },
    {
      step: "Out for delivery",
      description: "Package is Reached your nearest Station"
    },
    {
      step: "Delivered",
      description: "Package is Delivered to You"
    },
  ]

  useEffect(() => {
    setMargins({
      marginLeft: stepsRef.current[0].offsetWidth / 2,
      marginRight: stepsRef.current[3].offsetWidth / 2,
    });
  }, [stepsRef.current]);
  return (
    <div className="App">
      <div className="status">
        <div
          className="bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins?.marginLeft + "px",
            marginRight: margins?.marginRight + "px",
          }}
        >
          <span className="filled" style={{ width: `${33.333 * (stepNo - 1)}%` }}></span>
        </div>

        {steps?.map((item, index) =>
        (<div
          ref={(el) => stepsRef.current[index] = el}
          key={index}
          className={`step ${stepNo >= index + 1 ? "completed" : ""} ${nextStep === index + 1 ? "next" : ""}`}>
          {stepNo >= index + 1 ?
            (<span>&#10003;</span>)
            :
            (<span>{index + 1}</span>)}
          <p>{item.step}</p>
        </div>
        ))}
      </div>
      <h1>
        <span >Current Status: </span>
        <span className="ans">{steps[stepNo - 1].description}</span>
      </h1>
      {stepNo < steps.length && (
        <button
          onClick={() => {
            setStepNo(pre => pre === steps.length ? pre : pre + 1);
            setNextStep(pre => pre + 1);
          }}
        >{
            nextStep === steps.length ? "Finish" : "Next"
          }
        </button>)}
    </div >
  );
}

export default App;
