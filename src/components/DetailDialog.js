import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {withTranslation} from "react-i18next";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DetailDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const {user, t} = props;

    const handleClose = () => {
        setOpen(false);
        props.onDialogClosed();
    };

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
                {
                    user != null &&
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon/>
                                </IconButton>
                                <Avatar alt={user.name.first + ' ' + user.name.last} src={user.picture.thumbnail}/>
                                <Typography variant="h6" className={classes.title}>
                                    {user.name.title}. {user.name.first} {user.name.last}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <List>
                            <ListItem button>
                                <ListItemText primary={user.phone} secondary={t('detail_dialog.phone_number')}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary={user.email} secondary={t('detail_dialog.email')}/>
                            </ListItem>
                        </List>
                    </div>
                }
            </Dialog>
        </div>
    );
}

export default withTranslation()(DetailDialog);
