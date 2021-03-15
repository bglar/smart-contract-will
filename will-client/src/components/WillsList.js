import { Link } from 'react-router-dom'
import React, { useState,useEffect } from 'react';
import { getUserFiles } from '../context/actions';
import moment from 'moment'

const WillsList = () => {
    const [files, setFiles] = useState([]);
 
      useEffect(() => {
        const fetchData = async () => {
          const response = await getUserFiles();
          const files = response.data.items;
          console.log(files);
          setFiles(files);
        };
     
        fetchData();
      }, []);

    return (
        <div>
             <Link to="/" className="btn btn-danger pull-left mb-2">
                                <span className="text">Uplaod New Will</span>
                            </Link>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Document ID</th>
                        <th scope="col">Version</th>
                        <th scope="col">Date Uploaded</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {files.length>0 ? files.map((file,index) => (
                   
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{file.smartId}</td>
                    <td>{`v${index+1}`}</td>
                    <td>{moment(file.createdOn).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>
                        <Link to={`/document/${file.smartId}`} className="btn btn-primary ">
                            <span className="text">View</span>
                        </Link>
                        {" "}
                       
                        </td>

                    </tr>
                )) : <tr><td><p>You have not uploaded any will yet. Click <Link to="/" >here</Link> to upload one.</p></td></tr> }
                    
                  
                   
                </tbody>
            </table>


        </div>
    )
}

export default WillsList
