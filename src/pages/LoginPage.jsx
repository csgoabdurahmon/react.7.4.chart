import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../service/auth.service'

const validationSchema = Yup.object({
  username: Yup.string().required('Username kiriting'),
  password: Yup.string().min(4, 'Parol kamida 4 ta belgi bo‘lsin').required('Parol kiriting'),
})

function LoginPage() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError('')
        await loginAdmin(values)
        navigate('/admin', { replace: true })
      } catch (error) {
        setSubmitError(error.message || 'Login xatoligi')
      }
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-linear-to-b from-zinc-100 to-white text-zinc-900">
      <div className="w-full max-w-md bg-white border shadow-xl rounded-2xl border-zinc-200 p-7 shadow-zinc-300/30">
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">ADMIN LOGIN PAGE</p>
        <h1 className="mt-2 text-3xl font-bold">Nike Admin</h1>
        <p className="mt-1 text-sm text-zinc-500">Welcome back, administrator</p>

        <form className="mt-6 space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-zinc-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 transition-colors bg-white border rounded-lg outline-none border-zinc-300 text-zinc-900 focus:border-zinc-900"
              placeholder="ADMIN"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="mt-1 text-xs text-red-400">{formik.errors.username}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-zinc-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 transition-colors bg-white border rounded-lg outline-none border-zinc-300 text-zinc-900 focus:border-zinc-900"
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-1 text-xs text-red-400">{formik.errors.password}</p>
            ) : null}
          </div>

          {submitError ? <p className="text-sm text-red-400">{submitError}</p> : null}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-2.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formik.isSubmitting ? 'Kirilmoqda...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage