import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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

    render() {
        const {t, classes, addresses} = this.props;
        console.log(addresses);
        return (
            <div>
                <Paper className={classes.paper}>
                <List className={classes.root}>
                    {this.props.addresses.map((user, i) => (
                    <ListItem key={i} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={user.name.first + ' ' + user.name.last} src={user.picture.thumbnail} />
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
    AddressList.propTypes = {
        classes: PropTypes.object.isRequired,
    };

    export default withStyles(styles, {withTheme: true})(withTranslation()(AddressList));
