// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const MyBookings = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [currentBookings, setCurrentBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getAllBookings = async () => {
//     setCurrentBookings([]);
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `/api/booking/get-UserCurrentBookings/${currentUser?._id}?searchTerm=${searchTerm}`
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setCurrentBookings(data?.bookings);
//         setLoading(false);
//         setError(false);
//       } else {
//         setLoading(false);
//         setError(data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllBookings();
//   }, [searchTerm]);

//   const handleCancel = async (id) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `/api/booking/cancel-booking/${id}/${currentUser._id}`,
//         {
//           method: "POST",
//         }
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setLoading(false);
//         alert(data?.message);
//         getAllBookings();
//       } else {
//         setLoading(false);
//         alert(data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-[95%] shadow-xl rounded-lg p-3 flex flex-col gap-2">
//         {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//         {error && <h1 className="text-center text-2xl">{error}</h1>}
//         <div className="w-full border-b-4">
//           <input
//             className="border rounded-lg p-2 mb-2"
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//             }}
//           />
//         </div>
//         {!loading &&
//           currentBookings &&
//           currentBookings.map((booking, i) => {
//             return (
//               <div
//                 className="w-full border-y-2 p-3 flex flex-wrap overflow-auto gap-3 items-center justify-between"
//                 key={i}
//               >
//                 <Link to={`/package/${booking?.packageDetails?._id}`}>
//                   <img
//                     className="w-12 h-12"
//                     src={booking?.packageDetails?.packageImages[0]}
//                     alt="Package Image"
//                   />
//                 </Link>
//                 <Link to={`/package/${booking?.packageDetails?._id}`}>
//                   <p className="hover:underline">
//                     {booking?.packageDetails?.packageName}
//                   </p>
//                 </Link>
//                 <p>{booking?.buyer?.username}</p>
//                 <p>{booking?.buyer?.email}</p>
//                 <p>{booking?.date}</p>
//                 <button
//                   onClick={() => {
//                     handleCancel(booking._id);
//                   }}
//                   className="p-2 rounded bg-red-600 text-white hover:opacity-95"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;





//pages/user/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import logoImg from "../assets/images/logo.png"; // Update path as needed

const MyBookings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllBookings = async () => {
    setCurrentBookings([]);
    try {
      setLoading(true);
      const res = await fetch(
        `/api/booking/get-UserCurrentBookings/${currentUser?._id}?searchTerm=${searchTerm}`
      );
      const data = await res.json();
      if (data?.success) {
        setCurrentBookings(data?.bookings);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [searchTerm]);

  const handleCancel = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/booking/cancel-booking/${id}/${currentUser._id}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        getAllBookings();
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadReceipt = (booking) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logoImg;

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const logoWidth = 40;
      const logoHeight = 40;
      const logoX = (pageWidth - logoWidth) / 2;

      // Add Logo
      doc.addImage(img, "PNG", logoX, 20, logoWidth, logoHeight);

      // Title
      doc.setFontSize(18);
      doc.setFont("bold");
      doc.text("Travels & Tourism", pageWidth / 2, 70, { align: "center" });
      doc.text("Receipt", pageWidth / 2, 80, { align: "center" });

      // Customer Details
      doc.setFontSize(12);
      doc.setFont("normal");
      doc.text(`Customer Name: ${currentUser.username}`, 10, 90);
      doc.text(`Email: ${currentUser.email}`, 10, 100);
      doc.text(`Phone: ${currentUser.phone}`, 10, 110);
      doc.text(`Address: ${currentUser.address}`, 10, 120);
      doc.text(`Destination: ${booking?.packageDetails?.packageDestination}`, 10, 130);
      doc.text(`Date: ${booking?.date}`, 10, 140);
      doc.text(`Persons: ${booking?.persons}`, 10, 150);

      // Cost Calculation
      const basePrice = booking?.packageDetails?.packageDiscountPrice
        ? booking?.packageDetails?.packageDiscountPrice
        : booking?.packageDetails?.packagePrice;

      const totalPrice = basePrice * booking?.persons;
      const foodCharge = totalPrice * 0.05;
      const luxuryHotelCharge = totalPrice * 0.20;
      const touristCharge = totalPrice * 0.30;
      const localTransportCharge = totalPrice * 0.10;
      const airTransportCharge = totalPrice * 0.35;

      // Cost Breakdown
      doc.setFontSize(12);
      doc.text("Cost Breakdown:", 10, 160);
      doc.text("-------------------------------------------------", 10, 165);
      doc.text(`• Gourmet Meals & Refreshments (5%): ₹${foodCharge.toFixed(2)}`, 10, 175);
      doc.text(`• Luxury Hotel Accommodation (20%): ₹${luxuryHotelCharge.toFixed(2)}`, 10, 185);
      doc.text(`• Sightseeing & Guided Tours (30%): ₹${touristCharge.toFixed(2)}`, 10, 195);
      doc.text(`• Local Transportation Services (10%): ₹${localTransportCharge.toFixed(2)}`, 10, 205);
      doc.text(`• Premium Air Travel (35%): ₹${airTransportCharge.toFixed(2)}`, 10, 215);
      doc.text("-------------------------------------------------", 10, 225);
      
      doc.setFont("bold");
      doc.text(`Total Amount Payable: ₹${totalPrice.toFixed(2)}`, 10, 235);
      doc.setFontSize(10);
      doc.text(
        "Thank you for choosing our premium travel services. Have a wonderful journey!",
        pageWidth / 2,
        245,
        { align: "center" }
      );

      // Save PDF
      doc.save(`Receipt_${booking?.packageDetails?.packageName}.pdf`);
    };
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] shadow-xl rounded-lg p-3 flex flex-col gap-2">
        {loading && <h1 className="text-center text-2xl">Loading...</h1>}
        {error && <h1 className="text-center text-2xl">{error}</h1>}
        <div className="w-full border-b-4">
          <input
            className="border rounded-lg p-2 mb-2"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        {!loading &&
          currentBookings &&
          currentBookings.map((booking, i) => {
            return (
              <div
                className="w-full border-y-2 p-3 flex flex-wrap overflow-auto gap-3 items-center justify-between"
                key={i}
              >
                <Link to={`/package/${booking?.packageDetails?._id}`}>
                  <img
                    className="w-12 h-12"
                    src={booking?.packageDetails?.packageImages[0]}
                    alt="Package Image"
                  />
                </Link>
                <Link to={`/package/${booking?.packageDetails?._id}`}>
                  <p className="hover:underline">
                    {booking?.packageDetails?.packageName}
                  </p>
                </Link>
                <p>{booking?.buyer?.username}</p>
                <p>{booking?.buyer?.email}</p>
                <p>{booking?.date}</p>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="p-2 rounded bg-red-600 text-white hover:opacity-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDownloadReceipt(booking)}
                  className="p-2 rounded bg-blue-600 text-white hover:opacity-95"
                >
                  Download Receipt
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyBookings;
