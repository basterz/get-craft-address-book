import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DetailDialog from "../DetailDialog";

const styles = theme => ({
    root: {
        marginTop: theme.spacing(1),
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        paddingTop: 50,
    },
});
class AddressList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedUser: null
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    handleClickOpen(user) {
        this.setState({
            isOpen: true,
            selectedUser: user
        })
    };

    dialogClosed() {
        this.setState({
            isOpen: false,
            selectedUser: null
        })
    }

    render() {
        const {classes} = this.props;
        //this.state.showModal && <Modal open>...</Modal>
        return (
            <div>
                {
                    <DetailDialog open={this.state.isOpen} user={this.state.selectedUser} onDialogClosed={this.dialogClosed.bind(this)} />
                }
                <Paper className={classes.paper}>
                    <List className={classes.root}>
                        {this.props.addresses.map((user, i) => (
                                <ListItem key={i} alignItems="flex-start"  onClick={ this.handleClickOpen.bind(this, user) }>
                                <ListItemAvatar>
                                    <Avatar alt={user.name.first + ' ' + user.name.last} src={user.picture.thumbnail}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name.title.toLowerCase() + '. ' + user.name.first + ' ' + user.name.last}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {user.email}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withTranslation()(AddressList));
