import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  predictionResult: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

function PredictionForm() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [budget, setBudget] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    // For now, we'll just set a mock prediction
    setPrediction(`The movie "${title}" has a 75% chance of success!`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Movie Title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Genre"
          variant="filled"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <TextField
          label="Budget (in millions)"
          variant="filled"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Predict Success
        </Button>
      </form>
      {prediction && (
        <Paper className={classes.predictionResult}>
          <Typography variant="h6">Prediction Result:</Typography>
          <Typography>{prediction}</Typography>
        </Paper>
      )}
    </div>
  );
}

export default PredictionForm;