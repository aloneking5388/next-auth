'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const page = () => {

  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
   try {
     const res = await axios.get('/api/users/me')
     setData(res.data.data._id)
   } catch (error: any) {
    console.log(error);
   }
  }

  useEffect(()=>{
    getUserDetails()
  },[])

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="m-2 p-2">Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing" : 
        <Link className="bg-green-500 rounded-md p-2 my-2" href={`/profile/${data}`}>Click Here To show your id</Link>
      }</h2>
      <hr />
    </div>
  )
}

export default page