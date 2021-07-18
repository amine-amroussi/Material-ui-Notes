import React , {useState} from 'react'
import { Typography ,Container , Button , TextField , Radio , RadioGroup , FormControlLabel , FormControl , FormLabel} from '@material-ui/core'
import {makeStyles} from "@material-ui/core"
import {KeyboardArrowRight} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field : {
    marginTop : 20,
    marginBottom : 15,
    display: "block",
  }
})

export default function Create() {

  const classes = useStyles()
  const history = useHistory()

  const [title , setTitle] = useState("")
  const [details , setDetails] = useState("")
  const [titleError , setTitleError] = useState(false)
  const [detailsError , setDetailsError] = useState(false)
  const [category , setCategory] = useState("todos")


  const handleSubmit = e => {
    e.preventDefault();

    if (title === "") {
      setTitleError(true)
    }else{
      setTitleError(false)
    }

    if (details === "") {
      setDetailsError(true)
    }else{
      setDetailsError(false)
    }

    if (title && details) {
      fetch("http://localhost:8000/notes" , 
      {
        method : "POST",
        headers : {'Content-type' : "application/json"},
        body : JSON.stringify({title , details , category})
      }
      )
        .then(() => history.push("/"))
    }
  }

  return (
    <Container>
      <Typography 
        variant="h5"
        component="h1"
        gutterBottom
        color ="textSecondary"
      >
         Create a new Notes
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit} >

        <TextField label="Note title" variant="outlined" fullWidth required className={classes.field}
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          error={titleError}
        />
        <TextField label="Details" multiline rows={6} variant="outlined" fullWidth required className={classes.field}
          value={details}
          onChange={e => setDetails(e.target.value)}
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={e=>setCategory(e.target.value)} >
            <FormControlLabel value="money" control={<Radio />} label="Money" />          
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />          
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />          
            <FormControlLabel value="work" control={<Radio />} label="Work" />          
          </RadioGroup>
        </FormControl>

        <Button 
          variant="contained"
          disableElevation
          type="submit"
          color="primary" 
          endIcon={<KeyboardArrowRight/>}
        >
          Submit
        </Button>
      </form>

      

      
      
    </Container>
  )
}
