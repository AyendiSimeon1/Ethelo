"use client";
// import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';
import { FaGoogle } from "react-icons/fa";

export default function Signup () {
    // const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
        }
    return  (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
                <h1 className='text-2xl font-bold mb-4 text-gray-800'>Ethelo</h1>
                <p className='text-gray-600 mb-6'>
                    Join our community and make a difference with your volunteering efforts
                </p>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                            Email
                        </label>
                        <input 
                            type='text'
                            id='Email'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Enter your email address'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                            Password 
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='shadow appearance border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                            placeholder='Enter a password'
                            required
                        />
                    </div>
                    <button 
                        type='submit'
                        className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded focus: outline-none focus: shadow-none'
                        >
                            Create an account
                        </button>

                </form>
                <div className='flex justify-center mt-4'>
                    <button 
                        className='bg-white hover: bg-gray-200 text-gray-800 font bold py-2'
                        // onClick={() => router.push('/login')}
                    ><span><FaGoogle /></span>
                        Sign in with Google
                    </button>
                </div>
            </div>
            <div className='mt-8 text-gray-600'>
                <p>Already have an account ? <a href='/login' className='text-gray-800'>Sign in</a></p>
            </div>
        </div>
    )
}

