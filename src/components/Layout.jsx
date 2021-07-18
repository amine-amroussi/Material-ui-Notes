import React from 'react'
import { makeStyles , Drawer ,Typography , List , ListItem , ListItemText , ListItemIcon , AppBar , Toolbar , Avatar } from '@material-ui/core'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import {format} from "date-fns"

const drawerWidth = 250;

const useStyeles = makeStyles(theme => ({
    page : {
        backgroundColor : "#f9f9f9",
        width : "100%",
        height : "100vh",
        padding : 20,
    },
    drawer : {
        width : drawerWidth 
    },
    drawerPaper : {
        width : drawerWidth,    
    },
    root : {
        display: "flex", 

    },
    active : {
        backgroundColor : "#f4f4f4"
    },
    title : {
        padding: 15,
        textTransform : "capitalize"
    },
    appbar : {
        width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar : theme.mixins.toolbar,
    date : {
        flexGrow : 1,
    },
    avatar : {
        marginLeft : theme.spacing(2)
    }
}))

const Layout = ({children}) => {

    const classes = useStyeles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text : "My Notes",
            path : "/",
            icon : <SubjectOutlined color="secondary" />
        },
        {
            text : "Create Notes",
            path : "/create",
            icon : <AddCircleOutlineOutlined color="secondary" />
        },
    ]

    return (
        <div className={classes.root} >

        {/* App Bar */}

        <AppBar className={classes.appbar} elevation={0} position="fixed" >
            <Toolbar>
                <Typography className={classes.date} >
                   Today is {format(new Date() , "do MMMM Y")}
                </Typography>
                <Typography>
                    Mr. Robots
                </Typography>
                <Avatar src="/mr-robot.jpg" className={classes.avatar} />
            </Toolbar>
        </AppBar>

        {/* Drawer */}

            <Drawer 
            className={classes.drawer}
            variant = "permanent" 
            anchor="left"
            classes={{paper : classes.drawerPaper}}
            >
                <div  >
                    <Typography variant="h5" align="center" className={classes.title} >
                        Mr. Robot Notes 
                    </Typography>
                </div>

                {/* List / Link */}

                <List>
                    {menuItems.map((item , index) => {
                        return <ListItem key={index} button onClick={()=> history.push(item.path)} 
                                         className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    })}
                </List>

            </Drawer>

            <div className={classes.page} >
                <div className={classes.toolbar} >

                </div>
                {children}
            </div>
        </div>
    )
}

export default Layout
