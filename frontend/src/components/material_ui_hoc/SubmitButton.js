import { Button } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"

export const SubmitButton = withStyles({
    root:{
        backgroundColor:"#7cb342",
        color:"#fff8e1",
        fontFamily: "neue-haas-grotesk-display, sans-serif",
        fontSize:"16px",
        fontWeight: 400,
        fontStyle: "normal",
        margin: "20px auto 10px",
        display: "block",
        padding: "3px 20px",
        textTransform:"none",
    },
    disabled: {
        backgroundColor:"#aed581",
        color:"#c5e1a5",
    }

})(Button)