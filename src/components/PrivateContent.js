import React from "react";
import FileUploadSingle from "./FileUploadSingle";
import SearchedFiles from "./SearchedFiles";

const PrivateContent = props => {
    return (
        <div style={{ margin: '20px' }}>
            <br></br>
            <FileUploadSingle />
            <br></br>
            <hr></hr>
            <br></br>
            <SearchedFiles />
        </div>
    )
};

export default PrivateContent;
