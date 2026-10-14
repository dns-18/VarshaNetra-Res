import React, {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  ArrowRight,
  CheckCircle2,
  CloudRain,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  Mountain,
  Radio,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import loginTerrain from '../assets/login-terrain - Copy.png'

type Mode = 'login' | 'signup'

const DEMO_USER = {
  name: 'VarshaNetra Demo',
  email: 'demo@varshanetra.demo',
  password: 'VarshaDemo123',
}

export default function Auth() {
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [rememberMe, setRememberMe] = useState(true)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] =
    useState<'error' | 'success'>('error')

  const [demoActive, setDemoActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current)
      }
    }
  }, [])

  /* =========================================================
     RESTORE REMEMBERED EMAIL
  ========================================================= */

  useEffect(() => {
    try {
      const rememberedEmail = localStorage.getItem(
        'varshanetra-remember-email'
      )

      if (rememberedEmail) {
        setEmail(rememberedEmail)
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  /* =========================================================
     PASSWORD STRENGTH
  ========================================================= */

  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: 'Enter a password',
      }
    }

    let score = 0

    if (password.length >= 6) score++
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 1) {
      return {
        score: 1,
        label: 'Weak',
      }
    }

    if (score <= 3) {
      return {
        score: 2,
        label: 'Moderate',
      }
    }

    if (score === 4) {
      return {
        score: 3,
        label: 'Strong',
      }
    }

    return {
      score: 4,
      label: 'Excellent',
    }
  }, [password])

  /* =========================================================
     MESSAGE HELPERS
  ========================================================= */

  const setError = (text: string) => {
    setMessage(text)
    setMessageType('error')
  }

  const setSuccess = (text: string) => {
    setMessage(text)
    setMessageType('success')
  }

  /* =========================================================
     SAFE STORAGE
  ========================================================= */

  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem('varshanetra-user')

      if (!raw) {
        return null
      }

      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  /* =========================================================
     DEMO ACCOUNT
  ========================================================= */

  const useDemoAccount = () => {
    setMode('login')

    setName(DEMO_USER.name)
    setEmail(DEMO_USER.email)
    setPassword(DEMO_USER.password)
    setConfirmPassword('')

    setDemoActive(true)

    try {
      localStorage.setItem(
        'varshanetra-user',
        JSON.stringify(DEMO_USER)
      )
    } catch {
      // Ignore localStorage errors
    }

    setSuccess(
      'Demo account loaded. Press "Enter Demo Environment" to continue.'
    )
  }

  const enterDemoEnvironment = () => {
    try {
      localStorage.setItem(
        'varshanetra-user',
        JSON.stringify(DEMO_USER)
      )

      localStorage.setItem(
        'varshanetra-session',
        JSON.stringify({
          name: DEMO_USER.name,
          email: DEMO_USER.email,
          role: 'Field Observer',
          demo: true,
        })
      )

      localStorage.setItem(
        'varshanetra-demo-mode',
        'true'
      )

      localStorage.setItem(
        'varshanetra-remember-email',
        DEMO_USER.email
      )

      localStorage.setItem(
        'varshanetra-remember',
        'true'
      )
    } catch {
      // Ignore localStorage errors
    }

    navigate('/')
  }

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setMessage('')

    const cleanEmail = email.trim().toLowerCase()

    /* =======================================================
       BASIC VALIDATION
    ======================================================= */

    if (
      !cleanEmail ||
      !password.trim() ||
      (mode === 'signup' && !name.trim())
    ) {
      setError('Please complete every required field.')
      return
    }

    /* =======================================================
       SIGNUP
    ======================================================= */

    if (mode === 'signup') {
      if (password.length < 6) {
        setError(
          'Password must contain at least 6 characters.'
        )
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      const existingUser = getStoredUser()

      if (
        existingUser &&
        existingUser.email?.toLowerCase() === cleanEmail
      ) {
        setError(
          'An account with this email already exists. Please sign in.'
        )
        return
      }

      const user = {
        name: name.trim(),
        email: cleanEmail,
        password,
      }

      try {
        localStorage.setItem(
          'varshanetra-user',
          JSON.stringify(user)
        )

        localStorage.setItem(
          'varshanetra-session',
          JSON.stringify({
            name: user.name,
            email: user.email,
            role: 'User',
            demo: false,
          })
        )

        if (rememberMe) {
          localStorage.setItem(
            'varshanetra-remember',
            'true'
          )

          localStorage.setItem(
            'varshanetra-remember-email',
            user.email
          )
        } else {
          localStorage.removeItem(
            'varshanetra-remember'
          )

          localStorage.removeItem(
            'varshanetra-remember-email'
          )
        }

        localStorage.removeItem(
          'varshanetra-demo-mode'
        )
      } catch {
        setError(
          'Unable to save your account on this device.'
        )
        return
      }

      setIsSubmitting(true)

      setSuccess(
        'Account created successfully. Opening VarshaNetra...'
      )

      redirectTimer.current = setTimeout(() => {
        navigate('/')
      }, 700)

      return
    }

    /* =======================================================
       LOGIN
    ======================================================= */

    const stored = getStoredUser()

    if (!stored) {
      setError(
        'No account found. Create an account first or use Demo Access.'
      )
      return
    }

    if (
      stored.email?.toLowerCase() !== cleanEmail ||
      stored.password !== password
    ) {
      setError(
        'Incorrect email or password. Please check your credentials.'
      )
      return
    }

    const isDemoUser =
      stored.email?.toLowerCase() ===
      DEMO_USER.email.toLowerCase()

    try {
      localStorage.setItem(
        'varshanetra-session',
        JSON.stringify({
          name: stored.name,
          email: stored.email,
          role: isDemoUser
            ? 'Field Observer'
            : 'User',
          demo: isDemoUser,
        })
      )

      if (rememberMe) {
        localStorage.setItem(
          'varshanetra-remember',
          'true'
        )

        localStorage.setItem(
          'varshanetra-remember-email',
          stored.email
        )
      } else {
        localStorage.removeItem(
          'varshanetra-remember'
        )

        localStorage.removeItem(
          'varshanetra-remember-email'
        )
      }

      if (isDemoUser) {
        localStorage.setItem(
          'varshanetra-demo-mode',
          'true'
        )
      } else {
        localStorage.removeItem(
          'varshanetra-demo-mode'
        )
      }
    } catch {
      setError(
        'Unable to create a secure session on this device.'
      )
      return
    }

    setIsSubmitting(true)

    setSuccess(
      'Authentication successful. Opening command center...'
    )

    redirectTimer.current = setTimeout(() => {
      navigate('/')
    }, 700)
  }

  /* =========================================================
     SWITCH MODE
  ========================================================= */

  const resetAuthFields = () => {
    setMessage('')
    setDemoActive(false)

    setPassword('')
    setConfirmPassword('')

    setShowPassword(false)
    setShowConfirmPassword(false)

    setIsSubmitting(false)
  }

  const switchMode = () => {
    setMode(
      mode === 'login'
        ? 'signup'
        : 'login'
    )

    resetAuthFields()
  }

  const switchToLogin = () => {
    setMode('login')
    resetAuthFields()
  }

  const switchToSignup = () => {
    setMode('signup')
    resetAuthFields()
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        overflow-y-auto
        bg-[#02080f]
        text-white
      "
    >
      {/* =====================================================
          GLOBAL ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(6,182,212,0.06),transparent_32%),linear-gradient(180deg,#02080f,#061019)]
          "
        />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* =====================================================
          MAIN LAYOUT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-stretch
          justify-center
        "
      >
        {/* =================================================
            LEFT TERRAIN IMAGE

            IMPORTANT:
            The image already contains:
            - VarshaNetra branding
            - terrain data
            - satellite feed
            - intelligence core
            - monitoring nodes
            - data stream
            - coordinates
            - central intelligence beam

            Therefore we DO NOT duplicate those elements here.
        ================================================== */}

        <section
          className="
            relative
            hidden
            min-h-screen
            flex-1
            overflow-hidden
            lg:block
          "
          style={{
            backgroundImage: `url("${loginTerrain}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* =================================================
              IMAGE COLOR / READABILITY OVERLAY
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-transparent
              via-transparent
              to-[#02080f]/90
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-b
              from-[#02080f]/20
              via-transparent
              to-[#02080f]/45
            "
          />

          {/* =================================================
              VERY SUBTLE TECHNICAL GRID

              Kept extremely subtle so it doesn't duplicate
              the graphics already present in the image.
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
            "
            style={{
              backgroundImage:
                'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)',
              backgroundSize: '70px 70px',
            }}
          />

          {/* =================================================
              RIGHT EDGE BLEND
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              h-full
              w-28
              bg-gradient-to-r
              from-transparent
              to-[#02080f]
            "
          />

          {/* =================================================
              BOTTOM VIGNETTE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-40
              bg-gradient-to-t
              from-[#02080f]
              to-transparent
            "
          />
        </section>

        {/* =================================================
            RIGHT AUTH PANEL
        ================================================== */}

        <section
          className="
            relative
            flex
            min-h-screen
            w-full
            flex-col
            justify-center
            overflow-hidden
            bg-[#02080f]
            px-5
            py-10
            sm:px-8
            md:px-10
            lg:w-[460px]
            lg:shrink-0
            lg:px-10
            xl:w-[500px]
            xl:px-12
          "
        >
          {/* =================================================
              RIGHT PANEL ATMOSPHERE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_80%_85%,rgba(6,182,212,0.05),transparent_30%)]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-full
              w-px
              bg-gradient-to-b
              from-transparent
              via-cyan-400/20
              to-transparent
            "
          />

          {/* =================================================
              SECURE GATEWAY
          ================================================== */}

          <div
            className="
              absolute
              right-5
              top-5
              flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/10
              bg-emerald-400/[0.03]
              px-3
              py-1.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-emerald-400
              sm:right-8
              sm:top-8
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.7)]
              "
            />

            Secure gateway
          </div>

          {/* =================================================
              AUTH CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-md
            "
          >
            {/* =================================================
                MOBILE BRAND
            ================================================== */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-sky-400/15
                  bg-sky-400/10
                "
              >
                <CloudRain
                  className="h-5 w-5 text-sky-300"
                />
              </div>

              <div>
                <div
                  className="
                    font-mono
                    text-sm
                    font-black
                    tracking-[0.2em]
                  "
                >
                  VARSHA<span className="text-sky-400">NETRA</span>
                </div>

                <div
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-sky-400/70
                  "
                >
                  Terrain Intelligence
                </div>
              </div>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-sky-400"
                />

                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-sky-400
                  "
                >
                  {mode === 'login'
                    ? 'ACCESS CONTROL'
                    : 'NEW OPERATOR'}
                </span>
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-white
                  sm:text-[34px]
                "
              >
                {mode === 'login'
                  ? 'Welcome back.'
                  : 'Create your account.'}
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {mode === 'login'
                  ? 'Sign in to continue to the VarshaNetra command center.'
                  : 'Create your access profile and start using the terrain intelligence workspace.'}
              </p>
            </div>

            {/* =================================================
                LOGIN / SIGNUP TABS
            ================================================== */}

            <div
              className="
                mb-6
                grid
                grid-cols-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-1
              "
            >
              <button
                type="button"
                onClick={switchToLogin}
                className={`
                  rounded-lg
                  py-2.5
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    mode === 'login'
                      ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/10'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
                  }
                `}
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={switchToSignup}
                className={`
                  rounded-lg
                  py-2.5
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    mode === 'signup'
                      ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/10'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
                  }
                `}
              >
                Create account
              </button>
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={submit}
              className="space-y-4"
            >
              {/* =================================================
                  NAME
              ================================================== */}

              {mode === 'signup' && (
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-slate-300">
                    Full name
                  </span>

                  <div className="relative">
                    <UserIcon />

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      required
                      autoComplete="name"
                      className={inputClass('pl-11')}
                      placeholder="Your name"
                    />
                  </div>
                </label>
              )}

              {/* =================================================
                  EMAIL
              ================================================== */}

              <label className="block">
                <span className="mb-2 block text-xs font-medium text-slate-300">
                  Email address
                </span>

                <div className="relative">
                  <Mail
                    className={iconClass()}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setDemoActive(false)
                    }}
                    required
                    autoComplete="email"
                    className={inputClass('pl-11')}
                    placeholder="you@example.com"
                  />
                </div>
              </label>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">
                    Password
                  </span>

                  {mode === 'signup' &&
                    password && (
                      <span
                        className={`
                          text-[10px]
                          font-semibold
                          ${
                            passwordStrength.score >= 3
                              ? 'text-emerald-400'
                              : passwordStrength.score === 2
                              ? 'text-amber-400'
                              : 'text-red-400'
                          }
                        `}
                      >
                        {passwordStrength.label}
                      </span>
                    )}
                </div>

                <div className="relative">
                  <LockKeyhole
                    className={iconClass()}
                  />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setDemoActive(false)
                    }}
                    required
                    autoComplete={
                      mode === 'login'
                        ? 'current-password'
                        : 'new-password'
                    }
                    className={inputClass('pl-11 pr-11')}
                    placeholder="At least 6 characters"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className={`
                      absolute
                      right-3.5
                      top-3
                      rounded-md
                      p-1
                      text-slate-500
                      transition
                      hover:bg-white/5
                      hover:text-white
                    `}
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {/* PASSWORD STRENGTH */}

                {mode === 'signup' &&
                  password && (
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4].map(
                        (level) => (
                          <div
                            key={level}
                            className={`
                              h-1
                              flex-1
                              rounded-full
                              transition-all
                              duration-300
                              ${
                                passwordStrength.score >=
                                level
                                  ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.35)]'
                                  : 'bg-white/10'
                              }
                            `}
                          />
                        )
                      )}
                    </div>
                  )}
              </label>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================== */}

              {mode === 'signup' && (
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-slate-300">
                    Confirm password
                  </span>

                  <div className="relative">
                    <LockKeyhole
                      className={iconClass()}
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? 'text'
                          : 'password'
                      }
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      required
                      autoComplete="new-password"
                      className={inputClass(
                        'pl-11 pr-11'
                      )}
                      placeholder="Re-enter password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value
                        )
                      }
                      className="
                        absolute
                        right-3.5
                        top-3
                        rounded-md
                        p-1
                        text-slate-500
                        transition
                        hover:bg-white/5
                        hover:text-white
                      "
                      aria-label={
                        showConfirmPassword
                          ? 'Hide confirm password'
                          : 'Show confirm password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </label>
              )}

              {/* =================================================
                  REMEMBER ME
              ================================================== */}

              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(
                          event.target.checked
                        )
                      }
                      className="
                        h-4
                        w-4
                        rounded
                        border-slate-600
                        bg-slate-900
                        accent-sky-400
                        focus:ring-sky-400
                      "
                    />

                    <span className="text-xs text-slate-400">
                      Remember this session
                    </span>
                  </label>

                  <span className="text-[10px] text-slate-600">
                    Secure access
                  </span>
                </div>
              )}

              {/* =================================================
                  MESSAGE
              ================================================== */}

              {message && (
                <div
                  className={`
                    flex
                    items-start
                    gap-2
                    rounded-xl
                    border
                    p-3
                    text-xs
                    leading-5
                    ${
                      messageType === 'success'
                        ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                        : 'border-red-400/20 bg-red-400/10 text-red-300'
                    }
                  `}
                >
                  {messageType === 'success' ? (
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0"
                    />
                  )}

                  <span>{message}</span>
                </div>
              )}

              {/* =================================================
                  SUBMIT BUTTON
              ================================================== */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-sky-400
                  py-3.5
                  text-sm
                  font-bold
                  text-slate-950
                  shadow-lg
                  shadow-sky-400/10
                  transition-all
                  duration-200
                  hover:bg-sky-300
                  hover:shadow-sky-400/20
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-slate-950/30
                        border-t-slate-950
                      "
                    />

                    Opening command center...
                  </>
                ) : (
                  <>
                    {mode === 'login'
                      ? 'Sign in to command center'
                      : 'Create VarshaNetra account'}

                    <ArrowRight
                      size={17}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </form>

            {/* =================================================
                DEMO DIVIDER
            ================================================== */}

            {mode === 'login' && (
              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>

                <div className="relative flex justify-center">
                  <span
                    className="
                      bg-[#02080f]
                      px-3
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-slate-600
                    "
                  >
                    evaluator access
                  </span>
                </div>
              </div>
            )}

            {/* =================================================
                DEMO ACCESS
            ================================================== */}

            {mode === 'login' && (
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-sky-400/15
                  bg-sky-400/[0.04]
                  shadow-[0_0_40px_rgba(56,189,248,0.03)]
                "
              >
                {/* DEMO HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-sky-400/10
                    px-4
                    py-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-sky-400/10
                      "
                    >
                      <Fingerprint
                        size={16}
                        className="text-sky-300"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        DEMO ACCESS
                      </p>

                      <p
                        className="
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-wider
                          text-sky-400/70
                        "
                      >
                        Evaluator environment
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[9px]
                      text-emerald-400
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-emerald-400
                      "
                    />

                    READY
                  </span>
                </div>

                {/* DEMO BODY */}

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p
                        className="
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-wider
                          text-slate-600
                        "
                      >
                        Email
                      </p>

                      <p className="mt-1 truncate text-[11px] text-slate-300">
                        {DEMO_USER.email}
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-wider
                          text-slate-600
                        "
                      >
                        Role
                      </p>

                      <p className="mt-1 text-[11px] text-slate-300">
                        Field Observer
                      </p>
                    </div>
                  </div>

                  {!demoActive ? (
                    <button
                      type="button"
                      onClick={useDemoAccount}
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-sky-400/20
                        bg-sky-400/10
                        py-2.5
                        text-xs
                        font-semibold
                        text-sky-300
                        transition-all
                        hover:border-sky-400/30
                        hover:bg-sky-400/20
                        hover:shadow-[0_0_25px_rgba(56,189,248,0.08)]
                      "
                    >
                      <span className="text-base leading-none">
                        ⚡
                      </span>

                      Load demo credentials
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={enterDemoEnvironment}
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-emerald-400
                        py-2.5
                        text-xs
                        font-bold
                        text-slate-950
                        transition-all
                        hover:bg-emerald-300
                        hover:shadow-[0_0_25px_rgba(52,211,153,0.12)]
                      "
                    >
                      <Radio size={14} />

                      Enter Demo Environment

                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* =================================================
                BENEFITS
            ================================================== */}

            <div className="mt-7 grid grid-cols-3 gap-2">
              <div
                className="
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-3
                  text-center
                  transition
                  hover:border-sky-400/10
                  hover:bg-sky-400/[0.025]
                "
              >
                <CloudRain
                  size={15}
                  className="mx-auto text-sky-400"
                />

                <p className="mt-2 text-[9px] text-slate-500">
                  Weather
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-3
                  text-center
                  transition
                  hover:border-cyan-400/10
                  hover:bg-cyan-400/[0.025]
                "
              >
                <Mountain
                  size={15}
                  className="mx-auto text-cyan-400"
                />

                <p className="mt-2 text-[9px] text-slate-500">
                  Terrain
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  p-3
                  text-center
                  transition
                  hover:border-emerald-400/10
                  hover:bg-emerald-400/[0.025]
                "
              >
                <Radio
                  size={15}
                  className="mx-auto text-emerald-400"
                />

                <p className="mt-2 text-[9px] text-slate-500">
                  Alerts
                </p>
              </div>
            </div>

            {/* =================================================
                SWITCH MODE
            ================================================== */}

            <button
              type="button"
              onClick={switchMode}
              className="
                mt-7
                w-full
                text-center
                text-xs
                text-slate-500
                transition
                hover:text-sky-300
              "
            >
              {mode === 'login'
                ? 'New to VarshaNetra? Create an account'
                : 'Already have an account? Sign in'}
            </button>

            {/* =================================================
                HOME
            ================================================== */}

            <button
              type="button"
              onClick={() => navigate('/')}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                text-[11px]
                text-slate-600
                transition
                hover:text-white
              "
            >
              Return to Home
            </button>

            {/* =================================================
                FOOTER
            ================================================== */}

            <div className="mt-7 pb-2 text-center">
              <p
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-slate-700
                "
              >
                VARSHANETRA · SECURE ACCESS GATEWAY
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

/* ============================================================
   REUSABLE INPUT CLASSES
============================================================ */

function inputClass(extra = '') {
  return `
    w-full
    rounded-xl
    border
    border-white/10
    bg-white/[0.03]
    py-3
    ${extra}
    text-sm
    text-white
    outline-none
    transition-all
    placeholder:text-slate-600
    focus:border-sky-400/50
    focus:bg-sky-400/[0.04]
    focus:shadow-[0_0_25px_rgba(56,189,248,0.05)]
  `
}

function iconClass() {
  return `
    absolute
    left-3.5
    top-3.5
    h-4
    w-4
    text-slate-500
  `
}

function UserIcon() {
  return (
    <svg
      className={iconClass()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21a8 8 0 0 0-16 0"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
      />
    </svg>
  )
}