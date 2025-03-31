import React, { useState } from "react";
import {getDatabase,set,ref} from "firebase/database";
import { getStorage,ref as storageRef ,uploadBytes,getDownloadURL} from "firebase/storage";
import { app } from "../firebase";
import {useNavigate} from 'react-router-dom'
export const AddStudent = () => {
  // State to manage form inputs
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle form submission
  // Add this state for file
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phoneNumber.trim() || !file) {
      setMessage({ text: "Please fill all fields including file", type: "error" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload file first
      const storage = getStorage(app);
      const fileRef = storageRef(storage, `images/${name}/${file.name}`);
      await uploadBytes(fileRef, file); 
      const downloadURL = await getDownloadURL(fileRef);
      
      // Then save student data with file URL
      const db = getDatabase(app);
      await set(ref(db, 'student/' + name), {
        StudentName: name,
        PhoneNumber: phoneNumber,
        fileUrl: downloadURL
      });

      setName("");
      setPhoneNumber("");
      setFile(null);
      setFileUrl("");
      setMessage({ text: "Student added successfully!", type: "success" });
      navigate('/getStudents');
      
    } catch (error) {
      console.error("Error adding student: ", error);
      setMessage({ text: "Failed to add student", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ADD STUDENT</h1>
      
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
          />
        </div>
        
        // Add this after the phone number input field
  <div className="mb-4">
    <label htmlFor="file" className="block mb-2 font-medium">
      Upload File
    </label>
    <input
      type="file"
      id="file"
      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      className="w-full p-2 border rounded"
    />
  </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Add Student"}
        </button>
      </form>
    </div>
  );
};
