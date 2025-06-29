import React, { useEffect, useState } from 'react'
import axios from "axios";

const MyFiles = () => {
  const[data, setData] = useState();
    const headers ={
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`
  }

  const fetch = async ()=>{
    const res = await   axios.get("http://localhost:2000/api/file/get-all-files",{headers});
    console.log(res.data.data);
    setData(res.data.data);
  }
  useEffect(()=>{
    fetch();
  },[]);

  const handleDelete = async (fileid)=>{
    const res = await axios.patch(`http://localhost:2000/api/file/delete-file/${fileid}`,{},{headers});
    console.log(res.data);
    fetch();
  }
  return (
    <div className='flex flex-col gap-6 justify-center items-center'>
      <h1 className='text-2xl font-bold text-blue-500'>Uploaded Files</h1>
      <div className='flex flex-col gap-3'>
          { !data?.length == 0 ?
            data.map((item,i)=>(
              <div key={i} className="bg-white p-4 shadow-md rounded flex md:flex-row flex-col gap-3 justify-between items-center">
                  <span className="font-medium text-gray-800">{item.filename}</span>
                  <div className='flex md:gap-4'>
                    <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline transition-all duration-300"
                      >
                    🔗 View
                    </a>
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        🗑 Delete
                      </button>
                  </div>
            </div>
            )) :
             <div className="flex flex-col items-center justify-center mt-10 text-gray-600">
                <img
                  src="https://image.shutterstock.com/image-vector/no-data-result-not-found-260nw-2135601359.jpg"
                  alt="Empty Folder"
                  className="w-40 h-40 opacity-70"
                />
                <p className="text-lg mt-4 font-medium">No files uploaded yet</p>
              </div>
          }
      </div>
    </div>
  )
}

export default MyFiles