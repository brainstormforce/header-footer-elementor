import NavMenu from "@components/NavMenu";
import React from "react";
import ReactDOM from "react-dom";


document.addEventListener("DOMContentLoaded", function () {
    const rootElement = document.getElementById("hfe-admin-top-bar-root");
    console.log("Coming Here")
    if (rootElement) {
        ReactDOM.render(<NavMenu />, rootElement);
    }
});