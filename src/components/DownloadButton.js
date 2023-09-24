import React from 'react';
import axios from 'axios';

const DownloadButton = ({ fileName, fileUrl }) => {
  const handleDownload = () => {
    axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'blob',
    })
      .then(response => {
        // Create a temporary link element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(response.data);
        downloadLink.download = fileName;
        downloadLink.click();

        // Clean up the URL.createObjectURL
        URL.revokeObjectURL(downloadLink.href);
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  };

  return (
    <button className="btn btn-primary" style={{margin: '20px', position:'absolute', right:'15%'}} onClick={handleDownload}>Download {fileName}</button>
  );
};

export default DownloadButton;