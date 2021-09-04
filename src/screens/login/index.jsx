import { 
    Button,
    FormControl, 
    FormGroup,
    FormLabel,
    Grid,
    Input

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { GREY, PRIMARY } from '../../colors';

const image = require('../../assets/images/login.jpg');
const logo = require('../../assets/images/logo.svg');

const useStyles = makeStyles({
    form: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        width: '90%'
    },
    formGroup: {
        marginTop: '2rem'
    },
    formInput: {
        backgroundColor: GREY,
    },
    FormLabel: {
        color: PRIMARY,
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    grid: {
        height: '99vh',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    loginBox: {
        paddingTop: '2.5rem'
    },
    loginTitle: {
        fontWeight: "bold",
        fontSize: '2rem',
        display: 'block',
        marginBottom: '3rem'
    },
    logoContainer: {
        width: '98%'
    },
    
})


const Login = () => {
    const classes = useStyles();

    return ( 
        <Grid container>
            <Grid xs = '12' md = '8' className = {[classes.grid]}>
                <img src = {image.default} className = {classes.image} alt = "Seegiriya" />
            </Grid>
            <Grid 
                xs = '12'
                md = '4' 
                className = {classes.loginBox}
            >   <Grid 
                    container
                    className = {classes.logoContainer}
                    justifyContent = 'center'
                    alignItems = 'flex-start'
                >
                    <img src = {logo.default} alt = 'Logo'/>
                </Grid>
                <Grid
                    className = {classes.form}
                
                >
                    <span className = {classes.loginTitle}>Login</span>
                    <FormGroup className = {classes.formGroup}>
                        <FormControl>
                            <FormLabel className = {classes.FormLabel}>Email</FormLabel>
                            <Input autoFocus className = {classes.formInput} id="email" type = 'email' placeholder = 'Enter your email...'/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup className = {classes.formGroup}>
                        <FormControl>
                            <FormLabel className = {classes.FormLabel}>Password</FormLabel>
                            <Input className = {classes.formInput} id="password" type = 'password' placeholder = 'Enter your password...'/>
                        </FormControl>
                    </FormGroup>
                    <Button>Hello</Button>
                </Grid>
                
            </Grid>
        </Grid> );
}
 
export default Login;