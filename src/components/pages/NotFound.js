import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import history from '../basic/History';

const style = {
    button: {
        color: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
    },
};

const NotFound = () => (
    <Grid
        container
        justify='center'
        alignItems='center'
    >

        <Grid item xs={12} style={{ height: '33vh' }} />
        <Typography variant='h1' color='primary'>404</Typography>

        <Grid item xs={12} />
        <Typography variant='h5'>Sorry, page not found</Typography>

        <Grid item xs={12} style={{ height: '5vh' }} />
        <Button
            style={style.button}
            onClick={() => history.push('/')}
            id='editor-button'
        >
            go to snippets editor
        </Button>
    </Grid>
);

export default NotFound;
