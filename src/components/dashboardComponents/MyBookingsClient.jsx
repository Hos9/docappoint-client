"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaCalendarCheck,
  FaTrash,
  FaEdit,
  FaTimes,
  FaStethoscope,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateModal = ({ booking, onClose, onUpdated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: booking.patientName,
      gender: booking.gender,
      phone: booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    },
  });
  const [saving, setSaving] = useState(false);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.SERVER}/appointments/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(data),
        },
      );
      const result = await res.json();
      if (result.modifiedCount > 0) {
        toast.success("Appointment updated successfully!");
        onUpdated({ ...booking, ...data });
        onClose();
      }
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#0A1829] border border-sky-500/20 rounded-3xl w-full max-w-md p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-xl font-black text-white mb-1">Update Booking</h3>
        <p className="text-sky-400 text-sm font-bold mb-6">
          {booking.doctorName}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Read-only fields */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Your Email
            </label>
            <input
              defaultValue={booking.userEmail}
              readOnly
              className="w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Doctor
            </label>
            <input
              defaultValue={booking.doctorName}
              readOnly
              className="w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed text-sm"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Patient Name
            </label>
            <input
              type="text"
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border outline-none text-white text-sm ${errors.patientName ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("patientName", { required: "Required" })}
            />
            {errors.patientName && (
              <span className="text-red-400 text-[10px]">
                {errors.patientName.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Phone
            </label>
            <input
              type="tel"
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border outline-none text-white text-sm ${errors.phone ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("phone", { required: "Required" })}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Appointment Date
            </label>
            <input
              type="date"
              className="w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none text-white text-sm focus:border-sky-400"
              {...register("appointmentDate", { required: "Required" })}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Time Slot
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none text-white text-sm focus:border-sky-400"
              {...register("appointmentTime", { required: "Required" })}
            />
          </div>

          <button
            disabled={saving}
            type="submit"
            className={`w-full py-4 rounded-2xl text-white font-black flex items-center justify-center gap-2 transition-all active:scale-95 ${saving ? "bg-gray-700" : "bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] hover:opacity-90"}`}
          >
            {saving ? <ClipLoader color="#fff" size={18} /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

const MyBookingsClient = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBooking, setEditBooking] = useState(null);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      router.push("/login");
      return;
    }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.SERVER}/appointments?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${tokenData?.token}` },
        },
      );
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.SERVER}/appointments/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${tokenData?.token}` },
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        toast.success("Appointment deleted successfully!");
      }
    } catch {
      toast.error("Delete failed.");
    }
  };

  const statusColor = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-400/20",
    confirmed: "bg-green-500/10 text-green-400 border-green-400/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-400/20",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
            Bookings
          </span>
        </h1>
        <p className="text-gray-400 text-sm">
          Manage all your doctor appointments.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <ClipLoader color="#38BDF8" size={50} />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-[#0A1829] border border-sky-500/10 rounded-3xl">
          <FaStethoscope className="mx-auto text-sky-400/30 mb-4" size={48} />
          <p className="text-white font-bold text-xl mb-2">No bookings yet</p>
          <p className="text-gray-400 text-sm">
            Browse doctors and book your first appointment.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-[#0A1829] border border-sky-500/10 rounded-3xl p-6 hover:border-sky-500/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 className="text-white font-black text-lg">
                      {b.doctorName}
                    </h3>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${statusColor[b.status] || statusColor.pending}`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-400">
                    <span>
                      Patient: <b className="text-gray-200">{b.patientName}</b>
                    </span>
                    <span>
                      Date: <b className="text-gray-200">{b.appointmentDate}</b>
                    </span>
                    <span>
                      Phone: <b className="text-gray-200">{b.phone}</b>
                    </span>
                    <span>
                      Time: <b className="text-gray-200">{b.appointmentTime}</b>
                    </span>
                    <span>
                      Fee: <b className="text-sky-400">৳ {b.fee}</b>
                    </span>
                    <span>
                      Gender: <b className="text-gray-200">{b.gender}</b>
                    </span>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2">
                  <button
                    onClick={() => setEditBooking(b)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold text-sm hover:bg-sky-500/20 transition-all"
                  >
                    <FaEdit size={14} /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-sm hover:bg-red-500/20 transition-all"
                  >
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editBooking && (
        <UpdateModal
          booking={editBooking}
          onClose={() => setEditBooking(null)}
          onUpdated={(updated) => {
            setBookings((prev) =>
              prev.map((b) => (b._id === updated._id ? updated : b)),
            );
          }}
        />
      )}
    </div>
  );
};

export default MyBookingsClient;
