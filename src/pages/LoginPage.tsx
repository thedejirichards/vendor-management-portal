import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/loginimage.png'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire up authentication
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div
        className="relative h-56 md:h-auto md:flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-6 right-6 md:bottom-14 md:left-10 md:right-10">
          <h1 className="text-white font-extrabold uppercase leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="border-b-4 border-white pb-1">Third Party Risk</span>
            <br />
            Management Portal
          </h1>
        </div>
      </div>

      <div className="flex-1 flex items-start md:items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-slate-900">Log in</h2>
          <p className="mt-2 text-slate-500">Welcome back! Please enter your details.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600/40 focus:border-brand-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-800 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600/40 focus:border-brand-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-brand-600 py-3 font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600/40 focus:ring-offset-2"
            >
              Log In
            </button>

            <button
              type="button"
              className="block w-full text-center text-sm font-medium text-brand-600 hover:underline"
            >
              Login With SSO
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
