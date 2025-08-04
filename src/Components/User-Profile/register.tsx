// 'use client';

// import { useState } from 'react';
// import Image from "next/image";
// import user from "../../../public/userRegister.png";

// export default function PhoneOtpForm() {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//       {/* Title */}
//       <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-5">User Registration</h1>

//       {/* Card */}
//       <div className="w-[850px] h-[500px] bg-white shadow-lg rounded-md flex overflow-hidden">
        
//         {/* Left Side - Image */}
//         <div className="w-1/2 bg-black flex items-center justify-center">
//           <Image
//             src={user}
//             alt="User Registration"
//             className="object-cover w-full h-full"
//           />
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-1/2 p-10 flex flex-col justify-center">
//           <form className="space-y-6">
//             <div>
//               <label className="block text-lg mb-2 text-gray-700">Phone Number</label>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Enter phone number"
//                 className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-lg mb-2 text-gray-700">OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter OTP"
//                 className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition"
//             >
//               Verify
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// // const handleSubmit = async () => {
// //     try {
// //       const res = await fetch("/api/auth/verify-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         setMessage("Login successful!");
// //         setToken(data.token);
// //         localStorage.setItem("token", data.token); // optional
// //       } else {
// //         setMessage(data.error || "Verification failed.");
// //       }
// //     } catch (err) {
// //       setMessage("Something went wrong.");
// //     }
// //   };

'use client';

import Image from "next/image";
import user from "../../../public/userRegister.png";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function PhoneOtpForm() {
  const router = useRouter()
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        setToken(data.token);
        localStorage.setItem("token", data.token);

        router.push("/")
      } else {
        setMessage(data.error || "Verification failed.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    
      
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8">User Registration</h1>
      <div className="w-[850px] h-[500px] bg-white shadow-lg rounded-md flex overflow-hidden">
        {/* Left Side (Image) */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          <Image
            src={user}
            alt="Registration visual"
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors duration-300 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-yellow-500 transition-colors duration-300 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition-colors duration-300"
            >
              Verify
            </button>

            {/* Feedback Message */}
            {message && (
              <p className="text-sm mt-2 text-center text-gray-700">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
