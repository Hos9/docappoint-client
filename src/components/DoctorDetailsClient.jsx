"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHospital,
  FaBriefcaseMedical,
  FaClock,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const BookingModal = ({ doctor, user, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const payload = {
        userEmail: user.email,
        doctorName: doctor.name,
        doctorId: doctor.id,
        doctorSpecialty: doctor.specialty,
        patientName: data.patientName,
        gender: data.gender,
        phone: data.phone,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        fee: doctor.fee,
        status: "pending",
      };

      const res = await fetch(`${process.env.SERVER}/appointments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.insertedId) {
        toast.success("Appointment booked successfully!");
        reset();
        onClose();
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
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
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-xl font-black text-white mb-1">Book Appointment</h3>
        <p className="text-sky-400 text-sm font-bold mb-6">
          {doctor.name} — ৳ {doctor.fee}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Read-only: email */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Your Email
            </label>
            <input
              type="text"
              defaultValue={user.email}
              readOnly
              className="w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed text-sm"
            />
          </div>

          {/* Patient Name */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Patient Name
            </label>
            <input
              type="text"
              placeholder="Full name of patient"
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border outline-none text-white text-sm transition-all ${errors.patientName ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("patientName", {
                required: "Patient name is required",
              })}
            />
            {errors.patientName && (
              <span className="text-red-400 text-[10px] font-bold">
                {errors.patientName.message}
              </span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Gender
            </label>
            <select
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-[#040D1A] border outline-none text-white text-sm transition-all ${errors.gender ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("gender", { required: "Please select gender" })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-400 text-[10px] font-bold">
                {errors.gender.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border outline-none text-white text-sm transition-all ${errors.phone ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <span className="text-red-400 text-[10px] font-bold">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Appointment Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-white/5 border outline-none text-white text-sm transition-all ${errors.appointmentDate ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("appointmentDate", { required: "Date is required" })}
            />
            {errors.appointmentDate && (
              <span className="text-red-400 text-[10px] font-bold">
                {errors.appointmentDate.message}
              </span>
            )}
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Preferred Time Slot
            </label>
            <select
              className={`w-full mt-1 px-4 py-3 rounded-2xl bg-[#040D1A] border outline-none text-white text-sm transition-all ${errors.appointmentTime ? "border-red-500" : "border-white/10 focus:border-sky-400"}`}
              {...register("appointmentTime", {
                required: "Please select a time slot",
              })}
            >
              <option value="">Select time slot</option>
              {doctor.availability.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.appointmentTime && (
              <span className="text-red-400 text-[10px] font-bold">
                {errors.appointmentTime.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 mt-2 transition-all active:scale-95 ${submitting ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] hover:opacity-90"}`}
          >
            {submitting ? (
              <PulseLoader size={10} color="#fff" />
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const DoctorDetailsClient = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const handleBooking = () => {
    if (user) setShowModal(true);
    else router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#040D1A] py-12">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Doctor Card */}
          <div className="bg-[#0A1829] border border-sky-500/10 rounded-3xl overflow-hidden mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0 bg-gradient-to-br from-sky-900/20 to-blue-900/20">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="p-8 flex-1">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white">
                      {doctor.name}
                    </h1>
                    <span className="inline-block mt-1 bg-sky-500/20 text-sky-400 text-xs font-bold px-3 py-1 rounded-full">
                      {doctor.specialty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#040D1A] border border-yellow-400/20 px-3 py-1.5 rounded-full">
                    <FaStar className="text-yellow-400" size={14} />
                    <span className="text-yellow-400 font-black text-sm">
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaHospital className="text-sky-400 shrink-0" size={13} />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaMapMarkerAlt
                      className="text-sky-400 shrink-0"
                      size={13}
                    />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaBriefcaseMedical
                      className="text-sky-400 shrink-0"
                      size={13}
                    />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaMoneyBillWave
                      className="text-sky-400 shrink-0"
                      size={13}
                    />
                    <span className="text-sky-400 font-bold">
                      ৳ {doctor.fee} consultation
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FaClock className="text-sky-400" /> Available Hours
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map((slot, i) => (
                      <span
                        key={i}
                        className="bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-black hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#0A1829] border border-sky-500/10 rounded-3xl p-8">
            <h2 className="text-xl font-black text-white mb-4">
              About the Doctor
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {doctor.description}
            </p>
          </div>
        </div>
      </div>

      {showModal && user && (
        <BookingModal
          doctor={doctor}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorDetailsClient;
