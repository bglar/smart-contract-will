import React, {  useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUserFile } from '../context/actions';
import pdf from '../files/sample_will.pdf'
import '../styles/viewWill.css';


const ViewWill = () => {
  const { docId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserFile(docId);
      const data = result.data.data;
      const bufferObject = data.data;
      let arrayBuffer = []

      bufferObject.forEach(element => arrayBuffer.push(element.data));
      
      const file = new Blob(arrayBuffer, {
        type: "application/pdf"
      }, data.name);
      
      // let fileURL = URL.createObjectURL(file)
      // window.open(fileURL,'_blank');
    };

    fetchData();
  }, []);

  let myPdfFilePath = `${process.env.PUBLIC_URL}/sample_will.pdf`
  console.log(myPdfFilePath);

  return (
    <div>
      <div className="col-lg-8">

        <div className="card shadow mb-2">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Will Details</h6>
          </div>
        </div>

        <div className="h_iframe">
          <iframe title="Will Details" src={pdf} frameBorder="0"></iframe>
        </div>

      </div>
    </div>
  )
}

export default ViewWill
