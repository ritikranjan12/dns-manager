
"use client"
import React from 'react'
import {handleLogin} from './page.server'
import Link from 'next/link'

const Page = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSignIn = async () => {
        try {
            const data = await handleLogin({email, password})
            if (data.user) {
                window.localStorage.setItem('user', JSON.stringify(data.user.email))
            }
            if (data.session) {
                window.localStorage.setItem('session', data.session.access_token)
                window.location.href = '/'
            }

        } catch (error) {
            console.error(error)
        }
    }
  return (
    
    <main className="bg-black flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold mb-2">Sign in</div>
              <p className="text-zinc-600 mb-8">New here <Link href="/signup" className="text-blue-500">Create an Account</Link></p>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-zinc-700 text-sm font-bold mb-2">Email </label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" id="username" name="username" required className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-zinc-700 text-sm font-bold mb-2">Password </label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="flex items-center justify-between mb-6">
                <button onClick={handleSignIn} className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </main>
  )
}

export default Page
