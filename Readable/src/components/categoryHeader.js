import React from 'react';
import {
  RadioGroup,
  Paper,
  FormControlLabel,
  Radio,
  withStyles
} from '@material-ui/core';

const styles = () => ({
  selector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const CategoryHeader = props => {
  const { classes = {}, handleRadioChange = () => {} } = props;
  return (
    <Paper elevation={5}>
      <RadioGroup className={classes.selector} onChange={handleRadioChange}>
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="react" control={<Radio />} label="React" />
        <FormControlLabel value="redux" control={<Radio />} label="Redux" />
        <FormControlLabel value="udacity" control={<Radio />} label="Udacity" />
        <FormControlLabel
          value="javascript"
          control={<Radio />}
          label="JavaScript"
        />
      </RadioGroup>
    </Paper>
  );
};

export default withStyles(styles)(CategoryHeader);
