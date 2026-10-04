'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaStethoscope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';
import { PulseLoader } from 'react-spinners';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image || '',
      });
      if (error) {
        toast.error(error.message || 'Registration failed. Please try again.');
      } else {
        toast.success('Account created! Please log in.');
        router.push('/login');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div className="min-h-screen bg-[#040D1A] flex justify-center items-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2.5 rounded-xl text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <FaStethoscope size={22} />
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
              DocAppoint
            </span>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-[40px] bg-[#0A1829]/80 backdrop-blur-xl border border-sky-500/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">
              Create{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
                Account
              </span>
            </h2>
            <p className="text-gray-400 text-sm">Join DocAppoint and start booking appointments</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border outline-none text-white placeholder:text-gray-600 transition-all ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-sky-400'}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="text-red-400 text-[10px] font-bold">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border outline-none text-white placeholder:text-gray-600 transition-all ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-sky-400'}`}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <span className="text-red-400 text-[10px] font-bold">{errors.email.message}</span>}
              </div>
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Photo URL (Optional)</label>
              <input
                type="text"
                placeholder="https://your-photo-url.com"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-sky-400 transition-all"
                {...register('image')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border outline-none text-white placeholder:text-gray-600 transition-all ${errors.password ? 'border-red-500' : 'border-white/10 focus:border-sky-400'}`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters' },
                      validate: v => (/[A-Z]/.test(v) && /[a-z]/.test(v)) || 'Needs uppercase & lowercase',
                    })}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="text-red-400 text-[10px] font-bold">{errors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Confirm</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat password"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border outline-none text-white placeholder:text-gray-600 transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-sky-400'}`}
                    {...register('confirmPassword', {
                      required: 'Required',
                      validate: v => v === password || 'Passwords do not match',
                    })}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-red-400 text-[10px] font-bold">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 mt-2 transition-all active:scale-95 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] hover:opacity-90 shadow-lg shadow-sky-500/20'}`}
            >
              {loading ? <PulseLoader size={10} color="#fff" /> : 'Create Account'}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="px-4 bg-[#0A1829] text-gray-500 italic">Or register with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 px-5 py-3.5 border border-white/10 rounded-2xl font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500 font-bold">
            Already have an account?{' '}
            <Link href="/login" className="text-sky-400 hover:text-sky-300 underline underline-offset-4">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
