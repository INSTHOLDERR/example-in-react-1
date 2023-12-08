
import axios from "axios"
import {formik, useFormik} from "formik"
import toast , { Toaster } from "react-hot-toast"
import './App.css'


function App() {

  if(import.meta.env.MODE == "development"){
    axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`
  }

  const formik =useFormik({
    initialValues:{
      username:"",
      password:""
    },
    validate:validate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async(values)=>{
      let res= axios.post("/api/register",values);
      toast.promise(res,{
        loading:"Registering...",
        success:(data)=>{
          console.log(data);
          return data.data;
        },
        error:(error)=>{
          console.log(error);
          return(error.response.data);
        }
      })
    }
  })
  

  return (
   <div>
    <Toaster position="top-center"/>

    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps("username")} type="text" name=" username" id=" username" placeholder=" username" />
      <input {...formik.getFieldProps("password")}  type="password" name="password" id="password" placeholder="password" />
      <input type="submit" value="register" />
    </form>
   </div>
  )
}

export default App
