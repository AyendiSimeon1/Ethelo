"use client";
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState  } from 'react';
import { ClipLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { LoginUser } from '@/redux/authReducer';


export default function Login () {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
;    const dispatch = useAppDispatch();
    const { isLoading, isAuthenticated, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if(isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await dispatch(LoginUser({ email, password }))
            if (LoginUser.fulfilled.match(response)) {
                console.log('Signup succesul', response);
            }
        } catch (error) {
            console.log('failed');
        }
    }
    return  (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            className='shadow appearance border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                            placeholder='Enter a password'
                            required
                        />
                    </div>
                    <button 
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-3 rounded focus: outline-none focus: shadow-none'
                        >
                            { isLoading ? <ClipLoader size={15}/> : 'Login'}
                            
                        </button>

                </form>
                <div className='flex justify-center mt-4'>
                    <button 
                        className='bg-white hover: bg-gray-200 text-gray-800 font bold py-2'
                        // onClick={() => router.push('/login')}
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
            <div className='mt-8 text-gray-600'>
                <p>Already have an account ? <a href='/signup' className='text-gray-800'>Sign Up</a></p>
            </div>
        </div>
    )
}

