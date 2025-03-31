import React, { useState } from "react";
import {ref, getDatabase, update} from "firebase/database";
import {getStorage,ref as storageRef,deleteObject,uploadBytes,getDownloadURL} from "firebase/storage";
import { app } from "../firebase";
import {useNavigate,useLocation} from 'react-router-dom'
export const UpdateStudent = () => {
  // State to manage form inputs
  const location = useLocation();   
  console.log('the location state is', location);
  const [name, setName] = useState(location.state?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(location.state?.phone || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null); 
  const navigate = useNavigate()
  const [message, setMessage] = useState({ text: "", type: "" });

//handle file change
const handleFileSubmit = async (event)=>{
  const file = event.target.files[0];
  setFile(file);
}


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim() || !phoneNumber.trim()) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }
    
    setIsSubmitting(true);
    
    //if file is uploaded then only chnage it 
    if(file){
      const db= getDatabase(app);
    const storage = getStorage(app);
    const fileRef = storageRef(storage, `images/${location.state?.name}`);
    await uploadBytes(fileRef, file); 
    const downloadURL = await getDownloadURL(fileRef);

    const studentRef = ref(db, "student/"+location.state.name);
    update(studentRef,{
      StudentName: name,
      PhoneNumber: phoneNumber,
      fileUrl: downloadURL
    }).then(()=>{
      setMessage({ text: "Student updated successfully", type: "success" });
      setIsSubmitting(false);
      navigate('/getStudents') 
    }).catch((error)=>{
      setMessage({ text: "Error updating student", type: "error" });
      setIsSubmitting(false);
    })
    }else{
      //else if not upadted then keeppt he file derfualt and upate the detials only
      const db= getDatabase(app);

    const studentRef = ref(db, "student/"+location.state.name);
    update(studentRef,{
      StudentName: name,
      PhoneNumber: phoneNumber
    }).then(()=>{
      setMessage({ text: "Student updated successfully", type: "success" });
      setIsSubmitting(false);
      navigate('/getStudents') 
    }).catch((error)=>{
      setMessage({ text: "Error updating student", type: "error" });
      setIsSubmitting(false);
    })
    }
    
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update  STUDENT</h1>
      
      {/* Display success/error message */}
      {message.text && (
        <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">
            Student Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter student name"
            disabled
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter phone number"
            // value={lova}
          />
        </div>
        <input type="file" onChange={handleFileSubmit} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};
