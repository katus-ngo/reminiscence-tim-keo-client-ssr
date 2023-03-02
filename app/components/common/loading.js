import {CircularProgress} from "@material-ui/core";
import React from "react";

export default () => {
    return (
        <div style={{display: "flex", justifyContent: "center", padding: 20}}>
            <CircularProgress size={"2rem"} color={"secondary"} />
        </div>
    )
}