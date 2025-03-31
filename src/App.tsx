import { Button } from "./components/ui/button"
import { useState } from "react"
import {app} from "./firebase.ts"
import{ref,set,getDatabase} from "firebase/database"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { Dashboard } from "./pages/Dashboard.tsx"
import { AddStudent } from "./pages/AddStudent.tsx"
import {StudentList} from "./pages/StudentList.tsx"
import { UpdateStudent } from "./pages/updateStudent.tsx"
function App() {
  const [count, setCount] = useState(0)

  const func1 = (userId :Number , Name : String, City :String  ) =>{
    console.log(userId,Name,City);
    const db = getDatabase(app)
    set(ref(db,"users/"+userId ),{
      RollNo :userId,
      Naav : Name, 
      City : City 
    } )
  }
const myrouter = createBrowserRouter([
  {
    path :'',
    Component : Dashboard,
    children:[
      {
        path:'',
        Component : StudentList
      },
      {
        path:'addStudent',
        Component : AddStudent
      },
      {
        path:'getStudents',
        Component : StudentList
      },
      {
        path:'updateStudents',
        Component : UpdateStudent
      }
    ]
  }
])

  return (
   
<>
<RouterProvider router={myrouter} />
</>
  )
}

export default App
