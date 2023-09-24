import React from 'react';
import { useState, useRef } from 'react';
import './FileUploadSingle.css'
import axiosInstance from '../api/axios';

function FileUploadSingle(props) {
    const [file, setFile] = useState();
    const dateRef = useRef("");

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };


    const handleUploadClick = async (event) => {
        event.preventDefault();
        if (!file) {
            return;
        }
        const headers = {
            'content-type': "multipart/form-data"
        };
        const formData = new FormData();
        formData.append("image", file)
        formData.append("date", dateRef.current.value)
        try {
            const response = await axiosInstance.post("/invoice/fileSystem", formData, { headers });
            if (response?.status === 200) {
                alert("File uploaded successfully")
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
    <>
        <h3>Dodaj nową fakturę</h3>
        <div className="bordered">

            <form>
                <label for="purchase-date">Data zakupu</label>
                <input className="form-control" type="date" name="purchase-date" id="purchase-date" ref={dateRef} required></input>
                <br></br>
                <label for="file">Plik do przesłania</label>
                <br></br>
                <input className="form-control-file" type="file" id="file" onChange={handleFileChange} />


                <br></br>
                <button className="btn btn-success" onClick={handleUploadClick} >Upload</button>
            </form>
        </div>
    </>
    );
}

export default FileUploadSingle;