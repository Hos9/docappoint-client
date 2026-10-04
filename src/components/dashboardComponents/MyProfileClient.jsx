'use client';
import { useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { FaUser, FaEnvelope, FaEdit, FaTimes, FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

const UpdateProfileModal = ({ user, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user.name, image: user.image || '' },
  });
  const [saving, setSaving] = useState(false);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: data.name,
        image: data.image || undefined,
      });
      if (error) {
        toast.error(error.message || 'Update failed.');
      } else {
        toast.success('Profile updated successfully!');
        onClose();
        window.location.reload();
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0A1829] border border-sky-500/20 rounded-3xl w-full max-w-sm p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <FaTimes size={20} />
        </button>
        <h3 className="text-xl font-black text-white mb-6">Update Profile</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
            <input type="text"
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border outline-none text-white text-sm ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-sky-400'}`}
              {...register('name', { required: 'Name is required' })} />
            {errors.name && <span className="text-red-400 text-[10px]">{errors.name.message}</span>}
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Photo URL</label>
            <input type="text" placeholder="https://photo-url.com"
              className="w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none text-white text-sm focus:border-sky-400"
              {...register('image')} />
          </div>

          <button disabled={saving} type="submit"
            className={`w-full py-4 rounded-2xl text-white font-black flex items-center justify-center gap-2 transition-all active:scale-95 mt-2 ${saving ? 'bg-gray-700' : 'bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] hover:opacity-90'}`}>
            {saving ? <ClipLoader color="#fff" size={18} /> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

const MyProfileClient = () => {
  const { data: session } = authClient.useSession();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const user = session?.user;

  if (session === undefined) return (
    <div className="flex justify-center py-20"><ClipLoader color="#38BDF8" size={50} /></div>
  );
  if (!user) { router.push('/login'); return null; }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">Profile</span></h1>
        <p className="text-gray-400 text-sm">Manage your personal information.</p>
      </div>

      <div className="bg-[#0A1829] border border-sky-500/10 rounded-3xl p-8 max-w-lg">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-sky-500/30 shadow-xl">
              {user.image ? (
                <Image src={user.image} alt={user.name} width={96} height={96} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white text-3xl font-black">
                  {user.name?.charAt(0)}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-2 hover:bg-sky-400 transition-all shadow-lg">
              <FaCamera size={12} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="bg-sky-500/10 p-3 rounded-xl">
              <FaUser className="text-sky-400" size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</p>
              <p className="text-white font-bold">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="bg-sky-500/10 p-3 rounded-xl">
              <FaEnvelope className="text-sky-400" size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</p>
              <p className="text-white font-bold">{user.email}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-black hover:opacity-90 transition-all active:scale-95">
          <FaEdit size={15} /> Update Profile
        </button>
      </div>

      {showModal && <UpdateProfileModal user={user} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MyProfileClient;
