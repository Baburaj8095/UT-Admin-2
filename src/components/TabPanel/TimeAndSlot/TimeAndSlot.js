import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

const TimeAndSlot = () => {
  const [value, setValue] = useState(new Date());

  
      return (
        <p>uncomment below</p>
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
        //   <StaticDatePicker
        //     displayStaticWrapperAs="desktop"
        //     openTo="year"
        //     value={value}
        //     onChange={(newValue) => {
        //       setValue(newValue);
        //     }}
        //     renderInput={(params) => <TextField {...params} />}
        //   />
        // </LocalizationProvider>
      );
  
}

export default TimeAndSlot;
