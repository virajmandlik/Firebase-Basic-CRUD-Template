import React, { useEffect, useState } from "react";
import {app} from "../firebase";
import { getDatabase,ref,onValue, set, remove } from "firebase/database";
import {getStorage,ref as storageRef,deleteObject} from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const StudentList = () => {
  const navigate = useNavigate();
  const [studentData,setStudentData] = useState(null);
  useEffect(()=>{
    const db = getDatabase(app);
    const studentListRef = ref(db, 'student/');
    onValue(studentListRef,(snapshot)=>{
      const data = snapshot.val();
      console.log(data);
      setStudentData(data);
    })
    
  },[])

  const deleteFunc = (key) => {
      const storage = getStorage(app)

      const db = getDatabase(app);
      const stdudentRef = ref(db, 'student/' + key);  
      const imageRef = storageRef(storage,'images/');
      deleteObject(imageRef).then(()=>{
        remove(stdudentRef)
        .then(() => {
          console.log("Student deleted successfully"+key);
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
      }).then(()=>{
        alert({ text: "Student deleted successfully", type: "success" });
        navigate('/getStudents') 
      })
     
    }
  return (
    <div>
      <h1>Student List</h1>
      {studentData && (
        <div>
          {Object.entries(studentData).map(([key,value])=>{
            return(
              <div key={key} style={{padding:'10px'}}>
                <img src={value.fileUrl} style={{width: '20%', height: '20%'}} alt="" />
                <p>{value.StudentName} {value.PhoneNumber}</p>
                <button onClick={()=>{deleteFunc(key)}}> delete</button>
                <button onClick={() => navigate('/updateStudents', { 
                  state: { 
                    name: value.StudentName,
                    phone: value.PhoneNumber 
                  }
                })}> update</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
