'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaStethoscope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

export const metadata = {
  title: 'DocAppoint — Login',
};

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: callbackUrl,
      });
      if (error) {
        toast.error(error.message || 'Login failed. Please check your credentials.');
      } else {
        toast.success('Welcome back!');
        router.push(callbackUrl);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: 'google', callbackURL: callbackUrl });
  };

  return (
    <div className="min-h-screen bg-[#040D1A] flex justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2.5 rounded-xl text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <FaStethoscope size={22} />
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
              DocAppoint
            </span>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-[32px] bg-[#0A1829]/80 backdrop-blur-xl border border-sky-500/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">
              Welcome{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
                Back
              </span>
            </h2>
            <p className="text-gray-400 text-sm">Sign in to manage your appointments</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full px-5 py-3.5 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20'}`}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-red-400 text-xs font-bold">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Password</label>
                <span className="text-xs text-sky-400 font-bold cursor-pointer hover:underline">Forgot Password?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full px-5 py-3.5 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${errors.password ? 'border-red-500' : 'border-white/10 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20'}`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-400 transition-colors">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-400 text-xs font-bold">{errors.password.message}</span>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] hover:opacity-90 shadow-lg shadow-sky-500/20'}`}
            >
              {loading ? <PulseLoader size={10} color="#fff" /> : 'Sign In'}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs font-black uppercase tracking-widest">
              <span className="px-4 bg-[#0A1829] text-gray-500 italic">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 px-5 py-3.5 border border-white/10 rounded-2xl font-bold text-gray-300 bg-white/5 hover:bg-white/10 hover:border-sky-400/30 transition-all active:scale-95"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500 font-bold">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-sky-400 hover:text-sky-300 underline underline-offset-4">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
