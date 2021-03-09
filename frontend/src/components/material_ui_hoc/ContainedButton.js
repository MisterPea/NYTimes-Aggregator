import { Button } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"

const ContainedButton = withStyles({
    root:{
        backgroundColor:"rgb(68, 121, 162)",
        "&:hover" : {
            backgroundColor:"rgba(68, 121, 162,0.8)"
        },
        color:"#fff",
        fontFamily: "neue-haas-grotesk-display, sans-serif",
        fontSize:"16px",
        fontWeight: 400,
        fontStyle: "normal",
        margin: "20px auto 10px",
        display: "block",
        padding: "3px 20px",
        textTransform:"none",
        letterSpacing:"0.08em"
    },
    disabled: {
        backgroundColor:"#aed581",
        color:"#c5e1a5",
    },
   

})(Button)

export default ContainedButton