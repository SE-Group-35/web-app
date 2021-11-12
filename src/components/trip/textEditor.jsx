import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import { PRIMARY, WHITE } from '../../colors';


const useStyles = makeStyles((theme) => ({
    button: {
        width: "100%",
        height: "3rem",
        cursor: "pointer",
        backgroundColor: PRIMARY,
        color: WHITE,
        fontSize: "1.3rem",
        border: 0,
        margin:theme.spacing(0,0),
        position:"relative"
      },
}));   

const TextEditor = () => {
    const classes = useStyles();
    const [show, setShow] = useState('');
    const handleClick=()=>{
        console.log(show);
    };
    

    return (
        <>
        <Grid>
            <Container>
                <ReactQuill className="shadow-sm"
                            theme="snow"
                            style={{
                                height: 350,
                                marginTop: '1rem',
                                display: 'flex',
                                flexDirection: 'column'
                            }}

                            value={show}

                            modules={{
                                toolbar: [
                                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], [{size: []}],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{'align': []}],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', "video","image", "code-block"],
                                    ['clean']
                                ],
                            }}
                            formats={[
                                'header', 'font', 'size',
                                'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
                                'list', 'bullet', 'indent', 'link', 'video', 'image', "code-block", "align"
                            ]}
                            onChange={(val) => {
                                setShow(val)
                            }}
                />
                
                {/* <div dangerouslySetInnerHTML={{__html: show}}>
                
                </div> */}
            </Container>
            </Grid>
            <Grid>
            <button type="submit" className={classes.button} onClick={handleClick}>
              Save
            </button>
            </Grid>
        </>
    );
};

export default TextEditor;