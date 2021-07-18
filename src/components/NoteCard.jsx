import React from 'react'
import { makeStyles , Card , CardHeader , CardContent, IconButton, Typography , Avatar} from "@material-ui/core"
import { DeleteOutlined } from '@material-ui/icons'
import { pink, yellow , blue , green } from '@material-ui/core/colors'

const useStyles = makeStyles({
    avatar : {
        backgroundColor : note => {
            if(note.category === "work")
                return yellow[600]
            if(note.category === "reminders")
                return green[500]
            if (note.category === "todos") {
                return blue[400]
            }
            return pink[800]
        }
    }
})

export const NoteCard = ({note , handleDelete}) => {
    
    const classes = useStyles(note)

    return (
        <div>
            <Card elevation={2}>
                <CardHeader 
                    avatar ={<Avatar className={classes.avatar} >
                        {note.category[0].toUpperCase()}
                    </Avatar>}
                    action ={
                        <IconButton onClick={()=>handleDelete(note.id)} >
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={note.title}
                    subheader = {note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" >
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
