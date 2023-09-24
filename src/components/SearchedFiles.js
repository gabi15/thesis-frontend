import React, { useEffect } from 'react';
import { useState } from 'react';
import DownloadButton from './DownloadButton';
import axiosInstance from '../api/axios';
import './SearchedFiles.css';

function SearchedFiles() {
    const [allFiles, setAllFiles] = useState(null);

    const getFileById = async (invoiceId) => {
        return await axiosInstance.get(`/invoice/fileSystem/${invoiceId}`, { responseType: 'blob' })
    }

    const getAllFilesDetails = async () => {
        return await axiosInstance.get("/invoice/fileSystem")
    }


    const handleDeleteFileById = async (index) => {
        var result = window.confirm("Are you sure you want to delete?");
        if (!result) {
            return;
        }

        let invoiceId = allFiles[index].id;
        try {
            const response = await axiosInstance.delete(`/invoice/fileSystem/${invoiceId}`)
            if (response.status === 200) {
                alert("File deleted successfully")
                setAllFiles(allFiles.filter((file, i) => (i !== index)))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleGetFiles = async (event) => {
        setAllFiles(null)
        event.preventDefault();
        let files_temp = [];
        try {
            const response1 = await axiosInstance.get("/invoice/fileSystem")
            files_temp = response1?.data;
            if (!files_temp) {
                return;
            }
            if (files_temp?.length === 0) {
                alert("No files found")
                return;
            }
        }
        catch (error) {
            console.log(error)
            return;
        }

        for (let i = 0; i < files_temp.length; i++) {
            let invoiceId = files_temp[i].id;
            const response = await axiosInstance.get(`/invoice/fileSystem/${invoiceId}`, { responseType: 'blob' })
            console.log(response)
            files_temp[i].image = response.data
            if (i > 5) {
                break;
            }
        }
        setAllFiles(files_temp)
        console.log(files_temp)

    }

    return (
        <div>
            <button className="btn btn-dark" onClick={handleGetFiles}>Get files</button>
            <br></br>
            <br></br>

            {
                allFiles && allFiles.map((file, index) =>
                    <div>
                        <p>{file.date}</p>
                        <FileViewer file={file} />
                        <DownloadButton fileName={allFiles[index].name} fileUrl={URL.createObjectURL(file.image)} />
                        <button  style={{margin: '20px', position:'absolute', right:'5%'}} className="btn btn-danger" onClick={() => handleDeleteFileById(index)}> Delete </button>
                        <br></br>
                    </div>
                )
            }
        </div>
    )
}

export default SearchedFiles;








function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function FileViewer({ file }) {
    const isPdf = file.type === 'application/pdf';
    const [base64STR, setBase64STR] = useState(null);

    useEffect(() => {
        if (isPdf) {
            getBase64(file.image).then(base64str => {
                setBase64STR(base64str.replace("data:application/json;base64,", "data:application/pdf;base64,"));
            })
        }
    }, [isPdf])


    return <>
        {!isPdf ?
            <img src={URL.createObjectURL(file.image)} style={{ height: '300px' }} />
            : (
                base64STR ? <embed src={base64STR} /> : <div>Loading...</div>
            )
        }
    </>;
}