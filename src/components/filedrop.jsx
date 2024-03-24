"use client"

import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { FaDownload, FaFile } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { FaCloudUploadAlt } from 'react-icons/fa';


const Filedrop = ({user , projectId}) => {
  const [droppedFiles, setDroppedFiles] = useState([]);

  const [, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (item, monitor) => {
      if (item.files) {
        setDroppedFiles([...droppedFiles, ...item.files]);
      }
    },
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/files/${projectId}`);
        if (response.ok) {
          const files = await response.json();
          setDroppedFiles(files);
        } else {
          throw new Error('Failed to fetch files');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchFiles();
  }, [projectId]);


 

  const handleFileInputChange = async (e) => {
    const inputFiles = e.target.files;
    const updatedFiles = [...droppedFiles];
    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('userId', user.uid); // Default userId
      formData.append('projectId', projectId);

      try {
        const response = await fetch('http://localhost:8080/api/v1/files', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          updatedFiles.push(result);
          setDroppedFiles(updatedFiles);
        } else {
          throw new Error('Failed to upload file');
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
 
  };

  const deleteFile = async (index, fileId) => {
    const updatedFiles = [...droppedFiles];
    updatedFiles.splice(index, 1);
    setDroppedFiles(updatedFiles);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/files/${fileId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

 
  const downloadFile = async (fileId, fileName) => {
    try {
      const response = await fetch(`your-api-url/download/${fileId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };



  return (
    <>
      <section className="container p-4 mt-4">
        <div className="tt mb-2 flex items-center justify-between">
          <div className="tt-title">
            <h4 className="text-black font-semibold text-xl">
              Upload Project Files
            </h4>
            <p className="text-sm text-black">
              Project files will be made available to all team members
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-2">
          <div className="col-1 file-upload">
            <div
              ref={drop}
              className="flex items-center justify-center w-ful"
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-400"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-900 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                  onChange={handleFileInputChange}
                  multiple // Allow multiple files to be selected
                />
              </label>
            </div>
          </div>

          <div className="col-2 file-progress">
            <div className="tt">
              <h2 className="text-black">Files Uploaded</h2>
            </div>
            <div className="progress-fields mt-5">
              <div className="uploading-cont">
                <ul className="text-black">
                  {droppedFiles.map((file, index) => (
                    <div key={index}>
                      {/* Uploading File Content */}
                      <div className="mb-2 flex justify-between items-center">
                        <div className="flex items-center gap-x-3">
                          <span className="size-8 flex justify-center items-center border border-gray-700 text-gray-600 rounded-lg dark:border-neutral-700">
                            <FaFile />
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-black">
                              {file.fileName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {/* {(file.file.size / (1024 * 1024)).toFixed(2)} MB */}
                            </p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-x-2">
                        <button
                            className="text-blue-500 hover:text-blue-900 mx-3"
                            onClick={() => downloadFile(file._id, file.fileName)}
                          >
                           <FaDownload />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-900"
                            onClick={() => deleteFile(index, file._id)}
                          >
                            <IoTrashOutline />
                          </button>

                        </div>
                      </div>
                      {/* End Uploading File Content */}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Filedrop;
