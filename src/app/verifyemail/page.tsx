'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const [token, setToken] = useState('');
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post('/api/users/verifyemail', {token})
      setVerify(true)
      toast.success(response.data.message);
    } catch (error: any) {
      setError(true)
      toast.error(error.response.data.message);
    }
  }

  useEffect( ()=>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  },[])

  useEffect(() => {
    setError(false)
    if(token.length > 0) {
      verifyUserEmail()
    }
  },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'> Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `${token}` : "no Token"}
      </h2>
      {verify && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  )
}

export default page