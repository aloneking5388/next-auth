'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const page = ({params}: any) => {

  const router = useRouter()

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout")
      toast.success(response.data.message)
      router.push("/login")
    } catch (error: any) {
       toast.error(error.message)
    }
   }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <h2 className='bg-green-500 rounded-md p-2'>{params.id}</h2>
        <button className="bg-blue-500 rounded-lg mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rou" onClick={logout}>
        logout
      </button>
    </div>
  )
}

export default page