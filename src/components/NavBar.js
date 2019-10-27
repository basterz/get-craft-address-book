import React, {Component} from "react";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import {Toolbar, Typography, withStyles} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {fade} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import connect from "react-redux/lib/connect/connect";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    language: {
        color: theme.palette.common.white,
        marginLeft: theme.spacing(2),
    },
});

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.i18n.language
        };

    }

    handleChange = event => {
        var lang = event.target.value;
        this.props.i18n.changeLanguage(lang);
        this.setState({selected: lang});
    }

    render() {
        console.log(this.store);
        const {t, classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {t('home.title')}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder={t('home.search_placeholder')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                        <div className={classes.language}>
                            <FormControl>
                                <Select
                                        value={this.state.selected}
                                        onChange={this.handleChange}>
                                    <MenuItem value="" disabled>
                                        {t('home.language')}
                                    </MenuItem>
                                    <MenuItem value={'en'}>EN</MenuItem>
                                    <MenuItem value={'id'}>ID</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(withTranslation()(NavBar));
