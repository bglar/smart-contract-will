import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { uploadFile } from '../context/actions';
import '../styles/fileUpload.css';


const FileUpload = () => {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState(undefined)
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState({ "message": "", "class": "" });

    const selectFile = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const fileUploadHandler = () => {
        setProgress(0);
        uploadFile(selectedFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage({ message: `File upload sucessful: ${response.data.smartId}`, class: "success" });

                console.log("File upload sueccess...");
                console.log(response.data);
                setTimeout(function (){
                    history.push('/documents');
                  }, 2500); 
                  

            })
            .catch((error) => {
                console.log(error);
                setProgress(0);
                setMessage({ message: "Could not upload the file!", class: "danger" });
                setSelectedFile(undefined);
            });
        setSelectedFile(undefined);
    };

    return (
        <div>
            <div className="col-md-6" >
                {selectFile && (
                    <div className="progress">
                        <div className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progress + "%" }}
                        >

                            {progress}%
                            </div>
                    </div>
                )}

                {message.message.length > 0 && <p className={`alert alert-${message.class}`} style={{ marginTop: 7, marginBottom: 7  }} role="alert">{message.message}</p>}
                <form method="post" action="#" id="#">

                    <div className="form-group files ">
                        <label>Upload Your Last Will and Testament </label>
                        <input type="file" onChange={selectFile} className="form-control" />
                    </div>
                    <button width="100%" type="button" disabled={!selectedFile} className="btn btn-primary" onClick={fileUploadHandler}>Upload File</button>
                    {/* disabled={selectedFile.length>0 ? false: true} */}
                </form>
            </div>
        </div>
    )
}

export default FileUpload
