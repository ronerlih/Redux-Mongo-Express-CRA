import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FavBtn(props) {
  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      ❤&nbsp; 
    </span>
  );
}

export default FavBtn;
