// import React, { useEffect, useState } from "react";
// import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";

// const Booking = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const params = useParams();
//   const navigate = useNavigate();
//   const [packageData, setPackageData] = useState({
//     packageName: "",
//     packageDescription: "",
//     packageDestination: "",
//     packageDays: 1,
//     packageNights: 1,
//     packageAccommodation: "",
//     packageTransportation: "",
//     packageMeals: "",
//     packageActivities: "",
//     packagePrice: 500,
//     packageDiscountPrice: 0,
//     packageOffer: false,
//     packageRating: 0,
//     packageTotalRatings: 0,
//     packageImages: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     totalPrice: 0,
//     packageDetails: null,
//     buyer: null,
//     persons: 1,
//     date: null,
//   });
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [currentDate, setCurrentDate] = useState("");

//   const getPackageData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `/api/package/get-package-data/${params?.packageId}`
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setPackageData({
//           packageName: data?.packageData?.packageName,
//           packageDescription: data?.packageData?.packageDescription,
//           packageDestination: data?.packageData?.packageDestination,
//           packageDays: data?.packageData?.packageDays,
//           packageNights: data?.packageData?.packageNights,
//           packageAccommodation: data?.packageData?.packageAccommodation,
//           packageTransportation: data?.packageData?.packageTransportation,
//           packageMeals: data?.packageData?.packageMeals,
//           packageActivities: data?.packageData?.packageActivities,
//           packagePrice: data?.packageData?.packagePrice,
//           packageDiscountPrice: data?.packageData?.packageDiscountPrice,
//           packageOffer: data?.packageData?.packageOffer,
//           packageRating: data?.packageData?.packageRating,
//           packageTotalRatings: data?.packageData?.packageTotalRatings,
//           packageImages: data?.packageData?.packageImages,
//         });
//         setLoading(false);
//       } else {
//         setError(data?.message || "Something went wrong!");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get paymentgateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(`/api/package/braintree/token`);
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [currentUser]);

//   //handle payment & book package
//   const handleBookPackage = async () => {
//     if (
//       bookingData.packageDetails === "" ||
//       bookingData.buyer === "" ||
//       bookingData.totalPrice <= 0 ||
//       bookingData.persons <= 0 ||
//       bookingData.date === ""
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/booking/book-package/${params?.id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });
//       const data = await res.json();
//       if (data?.success) {
//         setLoading(false);
//         alert(data?.message);
//         navigate(`/profile/${currentUser?.user_role === 1 ? "admin" : "user"}`);
//       } else {
//         setLoading(false);
//         alert(data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (params?.packageId) {
//       getPackageData();
//     }
//     let date = new Date().toISOString().substring(0, 10);
//     let d = date.substring(0, 8) + (parseInt(date.substring(8)) + 1);
//     setCurrentDate(d);
//   }, [params?.packageId]);

//   useEffect(() => {
//     if (packageData && params?.packageId) {
//       setBookingData({
//         ...bookingData,
//         packageDetails: params?.packageId,
//         buyer: currentUser?._id,
//         totalPrice: packageData?.packageDiscountPrice
//           ? packageData?.packageDiscountPrice * bookingData?.persons
//           : packageData?.packagePrice * bookingData?.persons,
//       });
//     }
//   }, [packageData, params]);

//   return (
//     <div className="w-full flex flex-col items-center">
//       <div className="w-[95%] flex flex-col items-center p-6 rounded shadow-2xl gap-3">
//         <h1 className="text-center font-bold text-2xl">Book Package</h1>
//         {/* user info */}
//         <div className="w-full flex flex-wrap justify-center gap-2">
//           <div className="pr-3 md:border-r md:pr-6">
//             <div className="flex flex-col p-2 w-64 xsm:w-72 h-fit gap-2">
//               <div className="flex flex-col">
//                 <label htmlFor="username" className="font-semibold">
//                   Username:
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="p-1 rounded border border-black"
//                   value={currentUser.username}
//                   disabled
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="email" className="font-semibold">
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="p-1 rounded border border-black"
//                   value={currentUser.email}
//                   disabled
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="address" className="font-semibold">
//                   Address:
//                 </label>
//                 <textarea
//                   maxLength={200}
//                   type="text"
//                   id="address"
//                   className="p-1 rounded border border-black resize-none"
//                   value={currentUser.address}
//                   disabled
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="phone" className="font-semibold">
//                   Phone:
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   className="p-1 rounded border border-black"
//                   value={currentUser.phone}
//                   disabled
//                 />
//               </div>
//             </div>
//           </div>
//           {/* package info */}
//           <div className="pl-3 md:border-l md:pl-6">
//             <div className="flex flex-col gap-1">
//               <div className="flex flex-wrap gap-2">
//                 <img
//                   className="w-28"
//                   src={packageData.packageImages[0]}
//                   alt="Package image"
//                 />
//                 <div>
//                   <p className="font-semibold text-lg mb-1 capitalize">
//                     {packageData.packageName}
//                   </p>
//                   <p className="flex gap-2 text-green-700 font-semibold capitalize">
//                     <FaMapMarkerAlt /> {packageData.packageDestination}
//                   </p>
//                   {/* days & nights */}
//                   {(+packageData.packageDays > 0 ||
//                     +packageData.packageNights > 0) && (
//                     <p className="flex items-center gap-2">
//                       <FaClock />
//                       {+packageData.packageDays > 0 &&
//                         (+packageData.packageDays > 1
//                           ? packageData.packageDays + " Days"
//                           : packageData.packageDays + " Day")}
//                       {+packageData.packageDays > 0 &&
//                         +packageData.packageNights > 0 &&
//                         " - "}
//                       {+packageData.packageNights > 0 &&
//                         (+packageData.packageNights > 1
//                           ? packageData.packageNights + " Nights"
//                           : packageData.packageNights + " Night")}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-col my-1">
//                 <label className="font-semibold" htmlFor="date">
//                   Select Date:
//                 </label>
//                 <input
//                   type="date"
//                   min={currentDate !== "" ? currentDate : ""}
//                   //   min={"2024-01-23"}
//                   id="date"
//                   className="w-max border rounded"
//                   onChange={(e) => {
//                     setBookingData({ ...bookingData, date: e.target.value });
//                   }}
//                 />
//               </div>
//               {/* price */}
//               <p className="flex gap-1 text-xl font-semibold my-1">
//                 Price:
//                 {packageData.packageOffer ? (
//                   <>
//                     <span className="line-through text-gray-700">
//                     ₹{packageData.packagePrice}
//                     </span>{" "}
//                     -<span>₹{packageData.packageDiscountPrice}</span>
//                     <span className="text-lg ml-2 bg-green-700 p-1 rounded text-white">
//                       {Math.floor(
//                         ((+packageData.packagePrice -
//                           +packageData.packageDiscountPrice) /
//                           +packageData.packagePrice) *
//                           100
//                       )}
//                       % Off
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-green-700">
//                     ₹{packageData.packagePrice}
//                   </span>
//                 )}
//               </p>
//               {/* price */}
//               <div className="flex border-2 w-max">
//                 <button
//                   className="p-2 py-1 font-semibold"
//                   onClick={() => {
//                     if (bookingData.persons > 1) {
//                       setBookingData({
//                         ...bookingData,
//                         persons: (bookingData.persons -= 1),
//                         totalPrice: packageData.packageDiscountPrice
//                           ? packageData.packageDiscountPrice *
//                             bookingData.persons
//                           : packageData.packagePrice * bookingData.persons,
//                       });
//                     }
//                   }}
//                 >
//                   -
//                 </button>
//                 <input
//                   value={bookingData.persons}
//                   disabled
//                   type="text"
//                   className="border w-10 text-center text-lg"
//                 />
//                 <button
//                   className="p-2 py-1 font-semibold"
//                   onClick={() => {
//                     if (bookingData.persons < 10) {
//                       setBookingData({
//                         ...bookingData,
//                         persons: (bookingData.persons += 1),
//                         totalPrice: packageData.packageDiscountPrice
//                           ? packageData.packageDiscountPrice *
//                             bookingData.persons
//                           : packageData.packagePrice * bookingData.persons,
//                       });
//                     }
//                   }}
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="text-xl font-semibold">
//                 Total Price:
//                 <span className="text-green-700">
//                 ₹
//                   {packageData.packageDiscountPrice
//                     ? packageData.packageDiscountPrice * bookingData.persons
//                     : packageData.packagePrice * bookingData.persons}
//                 </span>
//               </p>
//               <div className="my-2 max-w-[300px] gap-1">
//                 <p
//                   className={`font-semibold ${
//                     instance && "text-red-700 text-sm"
//                   }`}
//                 >
//                   Payment:
//                   {!instance
//                     ? "Loading..."
//                     : "Don't use your original card details!(This is not the production build)"}
//                 </p>
//                 {clientToken && (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />
//                     <button
//                       className="p-2 rounded bg-blue-600 text-white payment-btn disabled:optional:80 hover:opacity-95 cursor-pointer"
//                       onClick={handleBookPackage}
//                       disabled={loading || !instance || !currentUser?.address}
//                     >
//                       {loading ? "Processing..." : "Book Now"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;





// import React, { useEffect, useState } from "react";
// import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// // import "jspdf-autotable";
// const logoImg = `${window.location.origin}/assets/images/logo.png`;


// const Booking = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const params = useParams();
//   const navigate = useNavigate();
//   const [packageData, setPackageData] = useState({
//     packageName: "",
//     packageDescription: "",
//     packageDestination: "",
//     packageDays: 1,
//     packageNights: 1,
//     packageAccommodation: "",
//     packageTransportation: "",
//     packageMeals: "",
//     packageActivities: "",
//     packagePrice: 500,
//     packageDiscountPrice: 0,
//     packageOffer: false,
//     packageRating: 0,
//     packageTotalRatings: 0,
//     packageImages: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     totalPrice: 0,
//     packageDetails: null,
//     buyer: null,
//     persons: 1,
//     date: null,
//   });
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [currentDate, setCurrentDate] = useState("");

//   const getPackageData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `/api/package/get-package-data/${params?.packageId}`
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setPackageData({
//           packageName: data?.packageData?.packageName,
//           packageDescription: data?.packageData?.packageDescription,
//           packageDestination: data?.packageData?.packageDestination,
//           packageDays: data?.packageData?.packageDays,
//           packageNights: data?.packageData?.packageNights,
//           packageAccommodation: data?.packageData?.packageAccommodation,
//           packageTransportation: data?.packageData?.packageTransportation,
//           packageMeals: data?.packageData?.packageMeals,
//           packageActivities: data?.packageData?.packageActivities,
//           packagePrice: data?.packageData?.packagePrice,
//           packageDiscountPrice: data?.packageData?.packageDiscountPrice,
//           packageOffer: data?.packageData?.packageOffer,
//           packageRating: data?.packageData?.packageRating,
//           packageTotalRatings: data?.packageData?.packageTotalRatings,
//           packageImages: data?.packageData?.packageImages,
//         });
//         setLoading(false);
//       } else {
//         setError(data?.message || "Something went wrong!");
//         setLoading(false);
//       }
//     } catch (error) {~
//       console.log(error);
//     }
//   };

//   //get paymentgateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(`/api/package/braintree/token`);
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [currentUser]);

//   //handle payment & book package
//   const handleBookPackage = async () => {
//     if (
//       bookingData.packageDetails === "" ||
//       bookingData.buyer === "" ||
//       bookingData.totalPrice <= 0 ||
//       bookingData.persons <= 0 ||
//       bookingData.date === ""
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/booking/book-package/${params?.id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });
//       const data = await res.json();
//       if (data?.success) {
//         setLoading(false);
//         alert(data?.message);
//         generateReceipt(); 
//         navigate(`/profile/${currentUser?.user_role === 1 ? "admin" : "user"}`);
//       } else {
//         setLoading(false);
//         alert(data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };


//   const generateReceipt = () => {
//     const doc = new jsPDF();
    
//     const logoImg = `${window.location.origin}/assets/images/logo.png`; // Ensure the logo path is correct
  
//     // Load and add logo
//     const img = new Image();
//     img.src = logoImg;
//     // img.onload = () => {
//     //   // doc.addImage(img, "PNG", 10, 10, 40, 20);
//     //   // doc.setFontSize(18);
//     //   // doc.text("KriThiyagu", 90, 50);
//     //   // doc.text("Travel & Tourism Receipt", 70, 30);

//     //   const pageWidth = doc.internal.pageSize.width; // Get page width

//     //   // Add Logo (Centered)
//     //   const logoWidth = 40;
//     //   const logoHeight = 20;
//     //   const logoX = (pageWidth - logoWidth) / 2; // Center horizontally
//     //   doc.addImage(img, "PNG", logoX, 10, logoWidth, logoHeight);
    
//     //   // Main Heading - KriThiyagu (Bold & Large)
//     //   doc.setFontSize(22);
//     //   doc.setFont("helvetica", "bold");
//     //   doc.text("KriThiyagu", pageWidth / 2, 40, { align: "center" });
    
//     //   // Subheading - Travel & Tourism Receipt
//     //   doc.setFontSize(16);
//     //   doc.setFont("times", "bold");
//     //   doc.text("Travel & Tourism Receipt", pageWidth / 2, 55, { align: "center" });
    
//     //   doc.setFontSize(12);
//     //   doc.text(`Customer Name: ${currentUser.username}`, 10, 50);
//     //   doc.text(`Email: ${currentUser.email}`, 10, 60);
//     //   doc.text(`Phone: ${currentUser.phone}`, 10, 70);
//     //   doc.text(`Address: ${currentUser.address}`, 10, 80);
//     //   doc.text(`Package: ${packageData.packageName}`, 10, 90);
//     //   doc.text(`Destination: ${packageData.packageDestination}`, 10, 100);
//     //   doc.text(`Date: ${bookingData.date}`, 10, 110);
//     //   doc.text(`Persons: ${bookingData.persons}`, 10, 120);
//     //   doc.text(
//     //     `Total Price: ₹${
//     //       packageData.packageDiscountPrice
//     //         ? packageData.packageDiscountPrice * bookingData.persons
//     //         : packageData.packagePrice * bookingData.persons
//     //     }`,
//     //     10,
//     //     130
//     //   );
    
//     //   doc.setFontSize(10);
//     //   doc.text("Thank you for booking with us!", 10, 150);
      
//     //   // Ensure download triggers properly
//     //   doc.save("Travel_Receipt.pdf");
//     // };
  
//     img.onload = () => {
//       const pageWidth = doc.internal.pageSize.width; // Get page width
    
//       // Logo Dimensions
//       const logoSize = 30; // Make it a square for a perfect circular look
//       const logoX = (pageWidth - logoSize) / 2; // Center horizontally
//       const logoY = 10; // Position at the top
    
//       // Draw a circle behind the logo for a professional touch
//       doc.setFillColor(240, 240, 240); // Light grey background
//       doc.circle(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, "F");
    
//       // Add Logo (Centered Inside the Circle)
//       doc.addImage(img, "PNG", logoX, logoY, logoSize, logoSize);
    
//       // Main Heading - KriThiyagu (Bold & Large)
//       doc.setFontSize(22);
//       doc.setFont("helvetica", "bold");
//       doc.text("KriThiyagu", pageWidth / 2, 50, { align: "center" });
    
//       // Subheading - Travel & Tourism Receipt
//       doc.setFontSize(16);
//       doc.setFont("times", "bold");
//       doc.text("Travel & Tourism Receipt", pageWidth / 2, 65, { align: "center" });
    
//       // Customer Details Section
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "normal");
//       doc.text(`Customer Name: ${currentUser.username}`, 20, 80);
//       doc.text(`Email: ${currentUser.email}`, 20, 90);
//       doc.text(`Phone: ${currentUser.phone}`, 20, 100);
//       doc.text(`Address: ${currentUser.address}`, 20, 110);
//       doc.text(`Package: ${packageData.packageName}`, 20, 120);
//       doc.text(`Destination: ${packageData.packageDestination}`, 20, 130);
//       doc.text(`Date: ${bookingData.date}`, 20, 140);
//       doc.text(`Persons: ${bookingData.persons}`, 20, 150);
    
//       // Pricing Details (Bold for Emphasis)
//       doc.setFont("helvetica", "bold");
//       doc.text(
//         `Total Price: ₹${
//           packageData.packageDiscountPrice
//             ? packageData.packageDiscountPrice * bookingData.persons
//             : packageData.packagePrice * bookingData.persons
//         }`,
//         20,
//         160
//       );
    
//       // Thank You Message
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "italic");
//       doc.text("Thank you for booking with us!", 20, 180);
    
//       // Ensure download triggers properly
//       doc.save("Travel_Receipt.pdf");
//     };
    

  
//   };
  

 

//   useEffect(() => {
//     if (params?.packageId) {
//       getPackageData();
//     }
//     let date = new Date().toISOString().substring(0, 10);
//     let d = date.substring(0, 8) + (parseInt(date.substring(8)) + 1);
//     setCurrentDate(d);
//   }, [params?.packageId]);

//   useEffect(() => {
//     if (packageData && params?.packageId) {
//       setBookingData({
//         ...bookingData,
//         packageDetails: params?.packageId,
//         buyer: currentUser?._id,
//         totalPrice: packageData?.packageDiscountPrice
//           ? packageData?.packageDiscountPrice * bookingData?.persons
//           : packageData?.packagePrice * bookingData?.persons,
//       });
//     }
//   }, [packageData, params]);

//   return (
//     <div className="w-full flex flex-col items-center">
//       <div className="w-[95%] flex flex-col items-center p-6 rounded shadow-2xl gap-3">
//         <h1 className="text-center font-bold text-2xl">Book Package</h1>
//         {/* user info */}
//         <div className="w-full flex flex-wrap justify-center gap-2">
//           <div className="pr-3 md:border-r md:pr-6">
//             <div className="flex flex-col p-2 w-64 xsm:w-72 h-fit gap-2">
//               <div className="flex flex-col">
//                 <label htmlFor="username" className="font-semibold">
//                   Username:
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="p-1 rounded border border-black"
//                   value={currentUser.username}
//                   disabled
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="email" className="font-semibold">
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="p-1 rounded border border-black"
//                   value={currentUser.email}
//                   disabled
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="address" className="font-semibold">
//                   Address:
//                 </label>
//                 <textarea
//                   maxLength={200}
//                   type="text"
//                   id="address"
//                   className="p-1 rounded border border-black resize-none"
//                   value={currentUser.address}
//                   disabled
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="phone" className="font-semibold">
//                   Phone:
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   className="p-1 rounded border border-black"
//                   value={currentUser.phone}
//                   disabled
//                 />
//               </div>
//             </div>
//           </div>
//           {/* package info */}
//           <div className="pl-3 md:border-l md:pl-6">
//             <div className="flex flex-col gap-1">
//               <div className="flex flex-wrap gap-2">
//                 <img
//                   className="w-28"
//                   src={packageData.packageImages[0]}
//                   alt="Package image"
//                 />
//                 <div>
//                   <p className="font-semibold text-lg mb-1 capitalize">
//                     {packageData.packageName}
//                   </p>
//                   <p className="flex gap-2 text-green-700 font-semibold capitalize">
//                     <FaMapMarkerAlt /> {packageData.packageDestination}
//                   </p>
//                   {/* days & nights */}
//                   {(+packageData.packageDays > 0 ||
//                     +packageData.packageNights > 0) && (
//                     <p className="flex items-center gap-2">
//                       <FaClock />
//                       {+packageData.packageDays > 0 &&
//                         (+packageData.packageDays > 1
//                           ? packageData.packageDays + " Days"
//                           : packageData.packageDays + " Day")}
//                       {+packageData.packageDays > 0 &&
//                         +packageData.packageNights > 0 &&
//                         " - "}
//                       {+packageData.packageNights > 0 &&
//                         (+packageData.packageNights > 1
//                           ? packageData.packageNights + " Nights"
//                           : packageData.packageNights + " Night")}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-col my-1">
//                 <label className="font-semibold" htmlFor="date">
//                   Select Date:
//                 </label>
//                 <input
//                   type="date"
//                   min={currentDate !== "" ? currentDate : ""}
//                   //   min={"2024-01-23"}
//                   id="date"
//                   className="w-max border rounded"
//                   onChange={(e) => {
//                     setBookingData({ ...bookingData, date: e.target.value });
//                   }}
//                 />
//               </div>
//               {/* price */}
//               <p className="flex gap-1 text-xl font-semibold my-1">
//                 Price:
//                 {packageData.packageOffer ? (
//                   <>
//                     <span className="line-through text-gray-700">
//                     ₹{packageData.packagePrice}
//                     </span>{" "}
//                     -<span>₹{packageData.packageDiscountPrice}</span>
//                     <span className="text-lg ml-2 bg-green-700 p-1 rounded text-white">
//                       {Math.floor(
//                         ((+packageData.packagePrice -
//                           +packageData.packageDiscountPrice) /
//                           +packageData.packagePrice) *
//                           100
//                       )}
//                       % Off
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-green-700">
//                     ₹{packageData.packagePrice}
//                   </span>
//                 )}
//               </p>
//               {/* price */}
//               <div className="flex border-2 w-max">
//                 <button
//                   className="p-2 py-1 font-semibold"
//                   onClick={() => {
//                     if (bookingData.persons > 1) {
//                       setBookingData({
//                         ...bookingData,
//                         persons: (bookingData.persons -= 1),
//                         totalPrice: packageData.packageDiscountPrice
//                           ? packageData.packageDiscountPrice *
//                             bookingData.persons
//                           : packageData.packagePrice * bookingData.persons,
//                       });
//                     }
//                   }}
//                 >
//                   -
//                 </button>
//                 <input
//                   value={bookingData.persons}
//                   disabled
//                   type="text"
//                   className="border w-10 text-center text-lg"
//                 />
//                 <button
//                   className="p-2 py-1 font-semibold"
//                   onClick={() => {
//                     if (bookingData.persons < 10) {
//                       setBookingData({
//                         ...bookingData,
//                         persons: (bookingData.persons += 1),
//                         totalPrice: packageData.packageDiscountPrice
//                           ? packageData.packageDiscountPrice *
//                             bookingData.persons
//                           : packageData.packagePrice * bookingData.persons,
//                       });
//                     }
//                   }}
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="text-xl font-semibold">
//                 Total Price:
//                 <span className="text-green-700">
//                 ₹
//                   {packageData.packageDiscountPrice
//                     ? packageData.packageDiscountPrice * bookingData.persons
//                     : packageData.packagePrice * bookingData.persons}
//                 </span>
//               </p>
//               <div className="my-2 max-w-[300px] gap-1">
//                 <p
//                   className={`font-semibold ${
//                     instance && "text-red-700 text-sm"
//                   }`}
//                 >
//                   Payment:
//                   {!instance
//                     ? "Loading..."
//                     : "Don't use your original card details!(This is not the production build)"}
//                 </p>
//                 {clientToken && (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />
//                     <button
//                       className="p-2 rounded bg-blue-600 text-white payment-btn disabled:optional:80 hover:opacity-95 cursor-pointer"
//                       onClick={handleBookPackage}
//                       disabled={loading || !instance || !currentUser?.address}
//                     >
//                       {loading ? "Processing..." : "Book Now"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;







//pages/user/Booking.jsx
import React, { useEffect, useState } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const logoImg = `${window.location.origin}/assets/images/baskar.png`;


const Booking = () => {
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 500,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageRating: 0,
    packageTotalRatings: 0,
    packageImages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    packageDetails: null,
    buyer: null,
    persons: 1,
    date: null,
  });
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/package/get-package-data/${params?.packageId}`
      );
      const data = await res.json();
      if (data?.success) {
        setPackageData({
          packageName: data?.packageData?.packageName,
          packageDescription: data?.packageData?.packageDescription,
          packageDestination: data?.packageData?.packageDestination,
          packageDays: data?.packageData?.packageDays,
          packageNights: data?.packageData?.packageNights,
          packageAccommodation: data?.packageData?.packageAccommodation,
          packageTransportation: data?.packageData?.packageTransportation,
          packageMeals: data?.packageData?.packageMeals,
          packageActivities: data?.packageData?.packageActivities,
          packagePrice: data?.packageData?.packagePrice,
          packageDiscountPrice: data?.packageData?.packageDiscountPrice,
          packageOffer: data?.packageData?.packageOffer,
          packageRating: data?.packageData?.packageRating,
          packageTotalRatings: data?.packageData?.packageTotalRatings,
          packageImages: data?.packageData?.packageImages,
        });
        setLoading(false);
      } else {
        setError(data?.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {~
      console.log(error);
    }
  };

  //get paymentgateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/package/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [currentUser]);

  //handle payment & book package
  const handleBookPackage = async () => {
    if (
      bookingData.packageDetails === "" ||
      bookingData.buyer === "" ||
      bookingData.totalPrice <= 0 ||
      bookingData.persons <= 0 ||
      bookingData.date === ""
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/booking/book-package/${params?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        generateReceipt(); 
        navigate(`/profile/${currentUser?.user_role === 1 ? "admin" : "user"}`);
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const generateReceipt = () => {
    const doc = new jsPDF();
    // const { jsPDF } = window.jspdf;
    
    const logoImg = `${window.location.origin}/assets/images/logo.png`; // Ensure the logo path is correct
  
// Load and add logo
const img = new Image();
img.src = logoImg;
img.onload = () => {
  // Initialize PDF
  const pageWidth = doc.internal.pageSize.getWidth();
  const logoWidth = 40;
  const logoHeight =40
  const logoX = (pageWidth - logoWidth) / 2;

  // Add Logo
  doc.addImage(img, "PNG", logoX, 20, logoWidth, logoHeight);
  // doc.addImage(img, "PNG", logoX, 10, 40, 20);

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
  doc.text(`Destination: ${packageData.packageDestination}`, 10, 130);
  doc.text(`Date: ${bookingData.date}`, 10, 140);
  doc.text(`Persons: ${bookingData.persons}`, 10, 150);

  // Calculate total price and breakdown
  const basePrice = packageData.packageDiscountPrice
    ? packageData.packageDiscountPrice
    : packageData.packagePrice;

  const totalPrice = basePrice * bookingData.persons;
  const foodCharge = totalPrice * 0.05;
  const luxuryHotelCharge = totalPrice * 0.20;
  const touristCharge = totalPrice * 0.30;
  const localTransportCharge = totalPrice * 0.10;
  const airTransportCharge = totalPrice * 0.35;

  // Cost Breakdown (Without Table)
  doc.setFontSize(12);
  doc.text("Cost Breakdown:", 10, 160);
  doc.text("------------------------------------------------------------------------------", 10, 165);
  doc.text(`• Gourmet Meals & Refreshments (5%): ₹${foodCharge.toFixed(2)}`, 10, 175);
  doc.text(`• Luxury Hotel Accommodation (20%): ₹${luxuryHotelCharge.toFixed(2)}`, 10, 185);
  doc.text(`• Sightseeing & Guided Tours (30%): ₹${touristCharge.toFixed(2)}`, 10, 195);
  doc.text(`• Local Transportation Services (10%): ₹${localTransportCharge.toFixed(2)}`, 10, 205);
  doc.text(`• Premium Air Travel (35%): ₹${airTransportCharge.toFixed(2)}`, 10, 215);
  doc.text("------------------------------------------------------------------------------", 10, 225);
  doc.setFont("bold");
  doc.text(`Total Amount Payable: ₹${totalPrice.toFixed(2)}`, 20, 235);
  doc.setFontSize(10);
  doc.text("Thank you for choosing our premium travel services. Have a wonderful journey!", pageWidth / 2, 250, { align: "center" });

  // Save PDF
  doc.save("Travels_Tourism_Receipt.pdf");
};
};
  

 

  useEffect(() => {
    if (params?.packageId) {
      getPackageData();
    }
    let date = new Date().toISOString().substring(0, 10);
    let d = date.substring(0, 8) + (parseInt(date.substring(8)) + 1);
    setCurrentDate(d);
  }, [params?.packageId]);

  useEffect(() => {
    if (packageData && params?.packageId) {
      setBookingData({
        ...bookingData,
        packageDetails: params?.packageId,
        buyer: currentUser?._id,
        totalPrice: packageData?.packageDiscountPrice
          ? packageData?.packageDiscountPrice * bookingData?.persons
          : packageData?.packagePrice * bookingData?.persons,
      });
    }
  }, [packageData, params]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] flex flex-col items-center p-6 rounded shadow-2xl gap-3">
        <h1 className="text-center font-bold text-2xl">Book Package</h1>
        {/* user info */}
        <div className="w-full flex flex-wrap justify-center gap-2">
          <div className="pr-3 md:border-r md:pr-6">
            <div className="flex flex-col p-2 w-64 xsm:w-72 h-fit gap-2">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="p-1 rounded border border-black"
                  value={currentUser.username}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-1 rounded border border-black"
                  value={currentUser.email}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="font-semibold">
                  Address:
                </label>
                <textarea
                  maxLength={200}
                  type="text"
                  id="address"
                  className="p-1 rounded border border-black resize-none"
                  value={currentUser.address}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  className="p-1 rounded border border-black"
                  value={currentUser.phone}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* package info */}
          <div className="pl-3 md:border-l md:pl-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap gap-2">
                <img
                  className="w-28"
                  src={packageData.packageImages[0]}
                  alt="Package image"
                />
                <div>
                  <p className="font-semibold text-lg mb-1 capitalize">
                    {packageData.packageName}
                  </p>
                  <p className="flex gap-2 text-green-700 font-semibold capitalize">
                    <FaMapMarkerAlt /> {packageData.packageDestination}
                  </p>
                  {/* days & nights */}
                  {(+packageData.packageDays > 0 ||
                    +packageData.packageNights > 0) && (
                    <p className="flex items-center gap-2">
                      <FaClock />
                      {+packageData.packageDays > 0 &&
                        (+packageData.packageDays > 1
                          ? packageData.packageDays + " Days"
                          : packageData.packageDays + " Day")}
                      {+packageData.packageDays > 0 &&
                        +packageData.packageNights > 0 &&
                        " - "}
                      {+packageData.packageNights > 0 &&
                        (+packageData.packageNights > 1
                          ? packageData.packageNights + " Nights"
                          : packageData.packageNights + " Night")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-1">
                <label className="font-semibold" htmlFor="date">
                  Select Date:
                </label>
                <input
                  type="date"
                  min={currentDate !== "" ? currentDate : ""}
                  //   min={"2024-01-23"}
                  id="date"
                  className="w-max border rounded"
                  onChange={(e) => {
                    setBookingData({ ...bookingData, date: e.target.value });
                  }}
                />
              </div>
              {/* price */}
              <p className="flex gap-1 text-xl font-semibold my-1">
                Price:
                {packageData.packageOffer ? (
                  <>
                    <span className="line-through text-gray-700">
                    ₹{packageData.packagePrice}
                    </span>{" "}
                    -<span>₹{packageData.packageDiscountPrice}</span>
                    <span className="text-lg ml-2 bg-green-700 p-1 rounded text-white">
                      {Math.floor(
                        ((+packageData.packagePrice -
                          +packageData.packageDiscountPrice) /
                          +packageData.packagePrice) *
                          100
                      )}
                      % Off
                    </span>
                  </>
                ) : (
                  <span className="text-green-700">
                    ₹{packageData.packagePrice}
                  </span>
                )}
              </p>
              {/* price */}
              <div className="flex border-2 w-max">
                <button
                  className="p-2 py-1 font-semibold"
                  onClick={() => {
                    if (bookingData.persons > 1) {
                      setBookingData({
                        ...bookingData,
                        persons: (bookingData.persons -= 1),
                        totalPrice: packageData.packageDiscountPrice
                          ? packageData.packageDiscountPrice *
                            bookingData.persons
                          : packageData.packagePrice * bookingData.persons,
                      });
                    }
                  }}
                >
                  -
                </button>
                <input
                  value={bookingData.persons}
                  disabled
                  type="text"
                  className="border w-10 text-center text-lg"
                />
                <button
                  className="p-2 py-1 font-semibold"
                  onClick={() => {
                    if (bookingData.persons < 10) {
                      setBookingData({
                        ...bookingData,
                        persons: (bookingData.persons += 1),
                        totalPrice: packageData.packageDiscountPrice
                          ? packageData.packageDiscountPrice *
                            bookingData.persons
                          : packageData.packagePrice * bookingData.persons,
                      });
                    }
                  }}
                >
                  +
                </button>
              </div>
              <p className="text-xl font-semibold">
                Total Price:
                <span className="text-green-700">
                ₹
                  {packageData.packageDiscountPrice
                    ? packageData.packageDiscountPrice * bookingData.persons
                    : packageData.packagePrice * bookingData.persons}
                </span>
              </p>
              <div className="my-2 max-w-[300px] gap-1">
                <p
                  className={`font-semibold ${
                    instance && "text-red-700 text-sm"
                  }`}
                >
                  Payment:
                  {!instance
                    ? "Loading..."
                    : "Don't use your original card details!(This is not the production build)"}
                </p>
                {clientToken && (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="p-2 rounded bg-blue-600 text-white payment-btn disabled:optional:80 hover:opacity-95 cursor-pointer"
                      onClick={handleBookPackage}
                      disabled={loading || !instance || !currentUser?.address}
                    >
                      {loading ? "Processing..." : "Book Now"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
