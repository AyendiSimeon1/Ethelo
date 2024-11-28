"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, FormEvent } from 'react';
import { FaGoogle } from "react-icons/fa";
import { SignupUser  } from '../../redux/authReducer';
import {  useAppDispatch, useAppSelector } from '../../redux/store';
import { ClipLoader } from 'react-spinners';
import { validateForm } from '@/utils/authValidation';


export default function Signup () {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState({});
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    console.log(isAuthenticated);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(isAuthenticated) {
            router.push('/profile');
        }
    }, [isAuthenticated, router]);



    const handleSubmit =  async (e: FormEvent) => {
        e.preventDefault();
        
        // const formValidation = validateForm(email, password);

        // if(Object.keys(formValidation).length > 0) {
        //     setValidationErrors(formValidation);

        //     setEmail('');

        //     setPassword('');
        // }
        
        
        
        try {
            const resultAction = await dispatch(SignupUser({ email, password }));
            if (SignupUser.fulfilled.match(resultAction)) {
                console.log('Signup successful', resultAction.payload);
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Signup error', error);
        }
    }
    return  (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
                {/* <div>
            {validationErrors && <p className="text-red-500">{validationErrors.name}

                </div> */}
            {error && 
                <div className='bg-red-500 text-center text-white p-2 m-2 shadow-lg transform transition-transform translate-y-0 opacity-100 rounded'>
                <p>{error}</p>
                
                </div>
                }
                
                <h1 className='text-2xl font-bold mb-4 text-blue-500'>Ethelo</h1>
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
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
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
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            className='shadow appearance border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                            placeholder='Enter a password'
                            required
                        />
                    </div>
                    <button 
                        type='submit'
                        className='bg-blue-600 text-center w-full hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus: outline-none focus: shadow-none'
                        >
                            <div>
                             { isLoading ? <ClipLoader size={15}/> : <p>Create an account</p>}
                             </div>
                        </button>

                </form>
                <div className='flex justify-center mt-4'>
                    <div>
                    <FaGoogle className='mt-3 mx-2' />
                    </div>
                    <div>                    <button 
                        className='bg-white hover: bg-gray-200 text-gray-800 font bold py-2'
                        // onClick={() => router.push('/login')}
                    >
                        Sign in with Google
                    </button>
                    </div>

                </div>
            </div>
            <div className='mt-8 text-gray-600'>
               
                <p>Already have an account ? <a href='/login' className='text-gray-800'>Sign in</a></p>
            </div>
        </div>
    )
}


