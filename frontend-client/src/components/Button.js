//import classNames from "classnames"; will need to install once we get to this point. 
import "./Button.scss";

function Button(props) {
   //const buttonClass = classNames("button", {
    //  "button--confirm": props.confirm,
    //  "button--danger": props.danger
  // });
 
   return (
     <button
       /* className={buttonClass} */
       className="join-button"
       onClick={props.onClick}
       /* disabled={props.disabled} */
     >
        {props.children}
     </button>
   );
 }


 export default Button;