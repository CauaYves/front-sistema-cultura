import { Stepper, Step, StepLabel } from '@mui/material';

type StepperProps = {
    steps: string[];
    activeStep: number;
};

export default function StepperComp({ steps, activeStep }: StepperProps) {
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}
