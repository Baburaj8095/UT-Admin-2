import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));



const TimeLine=(props)=> {

  const getStepContent=(step)=> {
    switch (step) {
      case 0:
        return `Order placed`;
      case 1:
        return 'Order yet to be processed';
      case 2:
        return `Order is being processed`;
      case 3:
        return `Order is confirmed`;
      case 4:
        return `The order is completed`;
      case 5:
        return `Order cancelled`;
      case 6:
        return `Order is Pending`;
      default:
        return 'Unknown status';
    }
  }


  const classes = useStyles();


  const defalutStatus = props.defaultStatus;
  const liveStatus = props.updatedStatus;
  
  const [activeStep, setActiveStep] = React.useState(0);


//   if(defalutStatus.includes(liveStatus)){

//     let index = defalutStatus.indexOf(liveStatus);
//   return setActiveStep((prevActiveStep) => prevActiveStep + index);

//   }

    let index = defalutStatus.indexOf(liveStatus);
    
    // setActiveStep((prevActiveStep) => prevActiveStep + index);



  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {defalutStatus.map((label, index) => (
          <Step key={label}>

            <StepLabel>{label}</StepLabel>

            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === defalutStatus.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>The order is completed</Typography>
        </Paper>
      )}
    </div>
  );
}


export default  TimeLine;