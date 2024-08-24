import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    root:{
        width:'100%',
        height:'100vh',
        background:'#ecf0f1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Poppins'
    },

    box:{
        width:'39vw',
        height:'auto',
        padding:'12px',
        background:'white',
        borderRadius:'20px',

    },

    centerstyle:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
    },

    errorHeading:{
        color: '#d32f2f',
        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing:' 0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        marginLeft:'14px'
    },

    productlist_box:{
        width:'65vw',
        height:'auto',
        padding:'12px',
        background:'#ecf0f1',
        borderRadius:'20px',

    },

    
})