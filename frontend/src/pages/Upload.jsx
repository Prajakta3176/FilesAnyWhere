import React, { useState } from 'react'
import axios from "axios";


const Upload = () => {

  const [file, setFile]= useState(null);
  const [message , setMessage]= useState("");
  const [ downloadLink, setDownloadLink] = useState("");
  const handleFileChange = (e)=>{
      setFile(e.target.files[0]);
      setMessage("");
  }

  const headers ={
    "Content-Type": "multipart/form-data",
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`

  }

  const handleUpload = async()=>{
    if(!file){
      return setMessage("Please select a file to upload.");
    }
    try{

      const formData = new FormData();
      formData.append("file",file);

      const res = await axios.post('http://localhost:2000/api/file/upload-file',formData,{headers});
      console.log(res.data);
      setDownloadLink(res?.data?.downloadLink);
      setMessage("✅ " + res.data.message);
      setFile(null);

    }catch(err){
       console.error(err);
       setMessage("❌ Upload failed. " + (err.response?.data?.error || err.message));
    }
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-yellow-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Upload a File</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 mb-4"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Upload
      </button>

      {message && (
        <div className="mt-4 text-center font-semibold text-gray-700">
          {message}
        </div>
      )}

       {downloadLink && (
        <div className="mt-2 text-center text-blue-700 font-semibold">
          <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="underline">
            🔗 Open Link
          </a>
        </div>
      )}
    </div>
  )
}

export default Upload