import React from 'react';
import { Stepper, Step, StepNumber, StepStatus } from 'react-progress-stepper';

const ProgressStepper = ({ step }) => {
  console.log('step: ', step);
  return (
    <>
      <Stepper dark step={step}>
        <Step>
          <StepNumber />
          <StepStatus />
        </Step>
        <Step>
          <StepNumber />
          <StepStatus />
        </Step>
        <Step>
          <StepNumber />
          <StepStatus />
        </Step>
      </Stepper>
    </>
  );
};

export default ProgressStepper;
