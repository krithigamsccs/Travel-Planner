// import React, { useState } from "react";
// import { app } from "../../firebase";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";

// const AddPackages = () => {
//   const [formData, setFormData] = useState({
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
//     packageImages: [],
//   });
//   const [images, setImages] = useState([]);
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [imageUploadPercent, setImageUploadPercent] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     if (e.target.type === "checkbox") {
//       setFormData({ ...formData, [e.target.id]: e.target.checked });
//     }
//   };

//   const handleImageSubmit = () => {
//     if (
//       images.length > 0 &&
//       images.length + formData.packageImages.length < 6
//     ) {
//       setUploading(true);
//       setImageUploadError(false);
//       const promises = [];

//       for (let i = 0; i < images.length; i++) {
//         promises.push(storeImage(images[i]));
//       }
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData({
//             ...formData,
//             packageImages: formData.packageImages.concat(urls),
//           });
//           setImageUploadError(false);
//           setUploading(false);
//         })
//         .catch((err) => {
//           setImageUploadError("Image upload failed (2mb max per image)");
//           setUploading(false);
//         });
//     } else {
//       setImageUploadError("You can only upload 5 images per package");
//       setUploading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name.replace(/\s/g, "");
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageUploadPercent(Math.floor(progress));
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleDeleteImage = (index) => {
//     setFormData({
//       ...formData,
//       packageImages: formData.packageImages.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.packageImages.length === 0) {
//       alert("You must upload atleast 1 image");
//       return;
//     }
//     if (
//       formData.packageName === "" ||
//       formData.packageDescription === "" ||
//       formData.packageDestination === "" ||
//       formData.packageAccommodation === "" ||
//       formData.packageTransportation === "" ||
//       formData.packageMeals === "" ||
//       formData.packageActivities === "" ||
//       formData.packagePrice === 0
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     if (formData.packagePrice < 0) {
//       alert("Price should be greater than 500!");
//       return;
//     }
//     if (formData.packageDiscountPrice >= formData.packagePrice) {
//       alert("Regular Price should be greater than Discount Price!");
//       return;
//     }
//     if (formData.packageOffer === false) {
//       setFormData({ ...formData, packageDiscountPrice: 0 });
//     }
//     // console.log(formData);
//     try {
//       setLoading(true);
//       setError(false);

//       const res = await fetch("/api/package/create-package", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data?.success === false) {
//         setError(data?.message);
//         setLoading(false);
//       }
//       setLoading(false);
//       setError(false);
//       alert(data?.message);
//       setFormData({
//         packageName: "",
//         packageDescription: "",
//         packageDestination: "",
//         packageDays: 1,
//         packageNights: 1,
//         packageAccommodation: "",
//         packageTransportation: "",
//         packageMeals: "",
//         packageActivities: "",
//         packagePrice: 500,
//         packageDiscountPrice: 0,
//         packageOffer: false,
//         packageImages: [],
//       });
//       setImages([]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <div className="w-full flex justify-center p-3">
//         <form
//           onSubmit={handleSubmit}
//           className="w-4/5 shadow-md rounded-xl p-3 gap-2 flex flex-col items-center"
//         >
//           <h1 className="text-center text-2xl font-semibold">Add Package</h1>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageName">Name:</label>
//             <input
//               type="text"
//               className="border border-black rounded"
//               id="packageName"
//               value={formData.packageName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageDescription">Description:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageDescription"
//               value={formData.packageDescription}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageDestination">Destination:</label>
//             <input
//               type="text"
//               className="border border-black rounded"
//               id="packageDestination"
//               value={formData.packageDestination}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-wrap w-full gap-2">
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageDays">Days:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageDays"
//                 value={formData.packageDays}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageNights">Nights:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageNights"
//                 value={formData.packageNights}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageAccommodation">Accommodation:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageAccommodation"
//               value={formData.packageAccommodation}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageTransportation">Transportation:</label>
//             <select
//               className="border border-black rounded-lg"
//               id="packageTransportation"
//               onChange={handleChange}
//             >
//               <option>Select</option>
//               <option>Flight</option>
//               <option>Bus</option>
//               <option>Train</option>
//               <option>Boat</option>
//               <option>Other</option>
//             </select>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageMeals">Meals:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageMeals"
//               value={formData.packageMeals}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageActivities">Activities:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageActivities"
//               value={formData.packageActivities}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packagePrice">Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packagePrice"
//               value={formData.packagePrice}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex items-center gap-2 w-full">
//             <label htmlFor="packageOffer">Offer:</label>
//             <input
//               type="checkbox"
//               className="border border-black rounded w-4 h-4"
//               id="packageOffer"
//               checked={formData.packageOffer}
//               onChange={handleChange}
//             />
//           </div>
//           <div
//             className={`${
//               formData.packageOffer ? "flex flex-col w-full" : "hidden"
//             }`}
//           >
//             <label htmlFor="packageDiscountPrice">Discount Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packageDiscountPrice"
//               value={formData.packageDiscountPrice}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageImages">
//               Images:
//               <span className="text-red-700 text-sm">
//                 (images size should be less than 2mb and max 5 images)
//               </span>
//             </label>
//             <input
//               type="file"
//               className="border border-black rounded"
//               id="packageImages"
//               multiple
//               onChange={(e) => setImages(e.target.files)}
//             />
//           </div>
//           {imageUploadError ||
//             (error && (
//               <span className="text-red-600 w-full">
//                 {imageUploadError || error}
//               </span>
//             ))}
//           <button
//             hidden={images.length === 0}
//             disabled={uploading || loading}
//             className="bg-green-700 p-3 rounded text-white hover:opacity-95 disabled:opacity-80 w-full"
//             type="button"
//             onClick={handleImageSubmit}
//           >
//             {uploading
//               ? `Uploading...(${imageUploadPercent}%)`
//               : loading
//               ? "Loading..."
//               : "Upload Images"}
//           </button>
//           <button
//             disabled={uploading || loading}
//             className="bg-green-700 p-3 rounded text-white hover:opacity-95 disabled:opacity-80 w-full"
//           >
//             {uploading
//               ? "Uploading..."
//               : loading
//               ? "Loading..."
//               : "Add Package"}
//           </button>
//           {formData.packageImages.length > 0 && (
//             <div className="p-3 w-full flex flex-col justify-center">
//               {formData.packageImages.map((image, i) => {
//                 return (
//                   <div
//                     key={i}
//                     className="shadow-xl rounded-lg p-1 flex flex-wrap my-2 justify-between"
//                   >
//                     <img src={image} alt="" className="h-20 w-20 rounded" />
//                     <button
//                       onClick={() => handleDeleteImage(i)}
//                       className="p-2 text-red-500 hover:cursor-pointer hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddPackages;




// //Baskar

// import React, { useState } from "react";

// const AddPackages = () => {
//   const [formData, setFormData] = useState({
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
//     packageImages: [],
//   });
//   const [images, setImages] = useState([]);
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     if (e.target.type === "checkbox") {
//       setFormData({ ...formData, [e.target.id]: e.target.checked });
//     }
//   };

//   const handleImageSubmit = async () => {
//     if (
//       images.length > 0 &&
//       images.length + formData.packageImages.length < 6
//     ) {
//       setUploading(true);
//       setImageUploadError(false);
//       try {
//         const formDataObj = new FormData();
//         Array.from(images).forEach((image) => {
//           formDataObj.append("images", image);
//         });

//         const res = await fetch("/api/upload", {
//           method: "POST",
//           body: formDataObj,
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setFormData({
//             ...formData,
//             packageImages: formData.packageImages.concat(data.urls),
//           });
//           setImageUploadError(false);
//         } else {
//           throw new Error(data.message || "Image upload failed.");
//         }
//       } catch (err) {
//         setImageUploadError(err.message || "Image upload failed.");
//       } finally {
//         setUploading(false);
//       }
//     } else {
//       setImageUploadError("You can only upload 5 images per package");
//     }
//   };

//   const handleDeleteImage = (index) => {
//     setFormData({
//       ...formData,
//       packageImages: formData.packageImages.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.packageImages.length === 0) {
//       alert("You must upload at least 1 image");
//       return;
//     }
//     if (
//       formData.packageName === "" ||
//       formData.packageDescription === "" ||
//       formData.packageDestination === "" ||
//       formData.packageAccommodation === "" ||
//       formData.packageTransportation === "" ||
//       formData.packageMeals === "" ||
//       formData.packageActivities === "" ||
//       formData.packagePrice === 0
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     if (formData.packagePrice < 0) {
//       alert("Price should be greater than 500!");
//       return;
//     }
//     if (formData.packageDiscountPrice >= formData.packagePrice) {
//       alert("Regular Price should be greater than Discount Price!");
//       return;
//     }
//     if (formData.packageOffer === false) {
//       setFormData({ ...formData, packageDiscountPrice: 0 });
//     }

//     try {
//       setLoading(true);
//       setError(false);

//       const res = await fetch("/api/package/create-package", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data?.success === false) {
//         setError(data?.message);
//         setLoading(false);
//       }
//       setLoading(false);
//       setError(false);
//       alert(data?.message);
//       setFormData({
//         packageName: "",
//         packageDescription: "",
//         packageDestination: "",
//         packageDays: 1,
//         packageNights: 1,
//         packageAccommodation: "",
//         packageTransportation: "",
//         packageMeals: "",
//         packageActivities: "",
//         packagePrice: 500,
//         packageDiscountPrice: 0,
//         packageOffer: false,
//         packageImages: [],
//       });
//       setImages([]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-3">
//       <form
//         onSubmit={handleSubmit}
//         className="w-4/5 shadow-md rounded-xl p-3 gap-2 flex flex-col items-center"
//       >
//         <h1 className="text-center text-2xl font-semibold">Add Package</h1>
//         {/* Form Fields */}
//         {/* Same as before */}
//         <div className="flex flex-col w-full">
//             <label htmlFor="packageName">Name:</label>
//             <input
//               type="text"
//               className="border border-black rounded"
//               id="packageName"
//               value={formData.packageName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageDescription">Description:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageDescription"
//               value={formData.packageDescription}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageDestination">Destination:</label>
//             <input
//               type="text"
//               className="border border-black rounded"
//               id="packageDestination"
//               value={formData.packageDestination}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-wrap w-full gap-2">
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageDays">Days:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageDays"
//                 value={formData.packageDays}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageNights">Nights:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageNights"
//                 value={formData.packageNights}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageAccommodation">Accommodation:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageAccommodation"
//               value={formData.packageAccommodation}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageTransportation">Transportation:</label>
//             <select
//               className="border border-black rounded-lg"
//               id="packageTransportation"
//               onChange={handleChange}
//             >
//               <option>Select</option>
//               <option>Flight</option>
//               <option>Train</option>
//               <option>Boat</option>
//               <option>Other</option>
//             </select>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageMeals">Meals:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageMeals"
//               value={formData.packageMeals}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageActivities">Activities:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageActivities"
//               value={formData.packageActivities}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packagePrice">Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packagePrice"
//               value={formData.packagePrice}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex items-center gap-2 w-full">
//             <label htmlFor="packageOffer">Offer:</label>
//             <input
//               type="checkbox"
//               className="border border-black rounded w-4 h-4"
//               id="packageOffer"
//               checked={formData.packageOffer}
//               onChange={handleChange}
//             />
//           </div>
//           <div
//             className={`${
//               formData.packageOffer ? "flex flex-col w-full" : "hidden"
//             }`}
//           >
//             <label htmlFor="packageDiscountPrice">Discount Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packageDiscountPrice"
//               value={formData.packageDiscountPrice}
//               onChange={handleChange}
//             />
//           </div> 

//         <div className="flex flex-col w-full">
//           <label htmlFor="packageImages">
//             Images:
//             <span className="text-red-700 text-sm">
//               (images size should be less than 2mb and max 5 images)
//             </span>
//           </label>
//           <input
//             type="file"
//             className="border border-black rounded"
//             id="packageImages"
//             multiple
//             onChange={(e) => setImages(e.target.files)}
//           />
//         </div>
//         {imageUploadError && (
//           <span className="text-red-600 w-full">{imageUploadError}</span>
//         )}
//         <button
//           hidden={images.length === 0}
//           disabled={uploading || loading}
//           className="bg-green-700 p-3 rounded text-white hover:opacity-95 disabled:opacity-80 w-full"
//           type="button"
//           onClick={handleImageSubmit}
//         >
//           {uploading ? "Uploading..." : "Upload Images"}
//         </button>
//         <button
//           disabled={uploading || loading}
//           className="bg-green-700 p-3 rounded text-white hover:opacity-95 disabled:opacity-80 w-full"
//         >
//           {loading ? "Loading..." : "Add Package"}
//         </button>
//         {formData.packageImages.length > 0 && (
//           <div className="p-3 w-full flex flex-col justify-center">
//             {formData.packageImages.map((image, i) => {
//               return (
//                 <div
//                   key={i}
//                   className="shadow-xl rounded-lg p-1 flex flex-wrap my-2 justify-between"
//                 >
//                   <img src={image} alt="" className="h-20 w-20 rounded" />
//                   <button
//                     onClick={() => handleDeleteImage(i)}
//                     className="p-2 text-red-500 hover:cursor-pointer hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AddPackages;

















// //src/pages/admin/Addpackages.jsx

// import React, { useState } from "react";

// const AddPackages = () => {
//   const [formData, setFormData] = useState({
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
//     packageImages: [],
//   });
//   const [images, setImages] = useState([]);
//   const [imageUploadError, setImageUploadError] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
//   };

//   const handleImageSubmit = async () => {
//     if (images.length === 0) {
//       setImageUploadError("No images selected for upload.");
//       return;
//     }

//     if (images.length + formData.packageImages.length > 5) {
//       setImageUploadError("You can upload a maximum of 5 images per package.");
//       return;
//     }

//     setUploading(true);
//     setImageUploadError("");
//     try {
//       const base64Images = await Promise.all(
//         Array.from(images).map((image) => {
//           return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(image);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = () => reject("Image processing failed.");
//           });
//         })
//       );

//       setFormData({
//         ...formData,
//         packageImages: formData.packageImages.concat(base64Images),
//       });
//     } catch (err) {
//       setImageUploadError(err || "Failed to process images.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     setFormData({
//       ...formData,
//       packageImages: formData.packageImages.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validations
//     if (formData.packageImages.length === 0) {
//       alert("At least one image is required.");
//       return;
//     }

//     if (
//       !formData.packageName ||
//       !formData.packageDescription ||
//       !formData.packageDestination ||
//       !formData.packageAccommodation ||
//       !formData.packageTransportation ||
//       !formData.packageMeals ||
//       !formData.packageActivities
//     ) {
//       alert("All fields are required.");
//       return;
//     }

//     if (formData.packagePrice <= 0 || formData.packagePrice < formData.packageDiscountPrice) {
//       alert("Ensure valid price values.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("/api/package/create-package", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!data.success) {
//         setError(data.message || "An error occurred.");
//         return;
//       }

//       alert("Package created successfully!");
//       setFormData({
//         packageName: "",
//         packageDescription: "",
//         packageDestination: "",
//         packageDays: 1,
//         packageNights: 1,
//         packageAccommodation: "",
//         packageTransportation: "",
//         packageMeals: "",
//         packageActivities: "",
//         packagePrice: 500,
//         packageDiscountPrice: 0,
//         packageOffer: false,
//         packageImages: [],
//       });
//       setImages([]);
//     } catch (err) {
//       setError("Failed to submit package.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-3">
//       <form
//         onSubmit={handleSubmit}
//         className="w-4/5 shadow-md rounded-xl p-3 gap-2 flex flex-col items-center"
//       >
//         <h1 className="text-center text-2xl font-semibold">Add Package</h1>

//         {/* Form Fields */}
//         <div className="flex flex-col w-full">
//           <label htmlFor="packageName">Name:</label>
//           <input
//             type="text"
//             className="border border-black rounded"
//             id="packageName"
//             value={formData.packageName}
//             onChange={handleChange}
//           />
//         </div>
//         {/* Additional fields as before */}
//                    <div className="flex flex-col w-full">
//             <label htmlFor="packageDescription">Description:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageDescription"
//               value={formData.packageDescription}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageDestination">Destination:</label>
//             <input
//               type="text"
//               className="border border-black rounded"
//               id="packageDestination"
//               value={formData.packageDestination}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-wrap w-full gap-2">
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageDays">Days:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageDays"
//                 value={formData.packageDays}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageNights">Nights:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageNights"
//                 value={formData.packageNights}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageAccommodation">Accommodation:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageAccommodation"
//               value={formData.packageAccommodation}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageTransportation">Transportation:</label>
//             <select
//               className="border border-black rounded-lg"
//               id="packageTransportation"
//               onChange={handleChange}
//             >
//               <option>Select</option>
//               <option>Flight</option>
//               <option>Train</option>
//               <option>Boat</option>
//               <option>Other</option>
//             </select>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageMeals">Meals:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageMeals"
//               value={formData.packageMeals}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageActivities">Activities:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageActivities"
//               value={formData.packageActivities}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packagePrice">Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packagePrice"
//               value={formData.packagePrice}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex items-center gap-2 w-full">
//             <label htmlFor="packageOffer">Offer:</label>
//             <input
//               type="checkbox"
//               className="border border-black rounded w-4 h-4"
//               id="packageOffer"
//               checked={formData.packageOffer}
//               onChange={handleChange}
//             />
//           </div>
//           <div
//             className={`${
//               formData.packageOffer ? "flex flex-col w-full" : "hidden"
//             }`}
//           >
//             <label htmlFor="packageDiscountPrice">Discount Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packageDiscountPrice"
//               value={formData.packageDiscountPrice}
//               onChange={handleChange}
//             /> 
//           </div>   
//         <div className="flex flex-col w-full">
//           <label htmlFor="packageImages">
//             Images:
//             <span className="text-red-700 text-sm">
//               (Max 5 images, each &lt; 2MB)
//             </span>
//           </label>
//           <input
//             type="file"
//             multiple
//             className="border border-black rounded"
//             id="packageImages"
//             onChange={(e) => setImages(e.target.files)}
//           />
//         </div>
//         {imageUploadError && (
//           <p className="text-red-600">{imageUploadError}</p>
//         )}
//         <button
//           type="button"
//           disabled={uploading || loading}
//           className="bg-blue-600 text-white p-2 rounded w-full"
//           onClick={handleImageSubmit}
//         >
//           {uploading ? "Uploading..." : "Upload Images"}
//         </button>

//         <button
//           disabled={uploading || loading}
//           className="bg-green-700 text-white p-2 rounded w-full"
//         >
//           {loading ? "Submitting..." : "Add Package"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPackages;




// // //src/pages/admin/Addpackages.jsx
// // Baskar L
// import React, { useState } from "react";

// const AddPackages = () => {
//   const [formData, setFormData] = useState({
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
//     packageImages: [],
//   });
//   const [images, setImages] = useState([]);
//   const [imageUploadError, setImageUploadError] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
//   };

//   const handleImageSubmit = async () => {
//     if (images.length === 0) {
//       setImageUploadError("No images selected for upload.");
//       return;
//     }

//     if (images.length + formData.packageImages.length > 5) {
//       setImageUploadError("You can upload a maximum of 5 images per package.");
//       return;
//     }

//     setUploading(true);
//     setImageUploadError("");
//     try {
//       const base64Images = await Promise.all(
//         Array.from(images).map((image) => {
//           return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(image);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = () => reject("Image processing failed.");
//           });
//         })
//       );

//       setFormData({
//         ...formData,
//         packageImages: formData.packageImages.concat(base64Images),
//       });
//     } catch (err) {
//       setImageUploadError(err || "Failed to process images.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validations
//     if (formData.packageImages.length === 0) {
//       alert("At least one image is required.");
//       return;
//     }

//     if (
//       !formData.packageName ||
//       !formData.packageDescription ||
//       !formData.packageDestination ||
//       !formData.packageAccommodation ||
//       !formData.packageTransportation ||
//       !formData.packageMeals ||
//       !formData.packageActivities
//     ) {
//       alert("All fields are required.");
//       return;
//     }

//     if (formData.packagePrice <= 0 || formData.packagePrice < formData.packageDiscountPrice) {
//       alert("Ensure valid price values.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("/api/package/create-package", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!data.success) {
//         setError(data.message || "An error occurred.");
//         return;
//       }

//       alert("Package created successfully!");
//       setFormData({
//         packageName: "",
//         packageDescription: "",
//         packageDestination: "",
//         packageDays: 1,
//         packageNights: 1,
//         packageAccommodation: "",
//         packageTransportation: "",
//         packageMeals: "",
//         packageActivities: "",
//         packagePrice: 500,
//         packageDiscountPrice: 0,
//         packageOffer: false,
//         packageImages: [],
//       });
//       setImages([]);
//     } catch (err) {
//       setError("Failed to submit package.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center p-3">
//       <form
//         onSubmit={handleSubmit}
//         className="w-4/5 shadow-md rounded-xl p-3 gap-2 flex flex-col items-center"
//       >
//         <h1 className="text-center text-2xl font-semibold">Add Package</h1>

//         {/* Form Fields */}
//         <div className="flex flex-col w-full">
//           <label htmlFor="packageName">Name:</label>
//           <input
//             type="text"
//             className="border border-black rounded"
//             id="packageName"
//             value={formData.packageName}
//             onChange={handleChange}
//           />
//         </div>

//                           <div className="flex flex-col w-full">
//              <label htmlFor="packageDescription">Description:</label>
//              <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageDescription"
//               value={formData.packageDescription}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageDestination">Destination:</label>
//             <input
//               type="text"
//               className="border border-black rounded"
//               id="packageDestination"
//               value={formData.packageDestination}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-wrap w-full gap-2">
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageDays">Days:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageDays"
//                 value={formData.packageDays}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex flex-col flex-1">
//               <label htmlFor="packageNights">Nights:</label>
//               <input
//                 type="number"
//                 className="border border-black rounded"
//                 id="packageNights"
//                 value={formData.packageNights}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageAccommodation">Accommodation:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageAccommodation"
//               value={formData.packageAccommodation}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageTransportation">Transportation:</label>
//             <select
//               className="border border-black rounded-lg"
//               id="packageTransportation"
//               onChange={handleChange}
//             >
//               <option>Select</option>
//               <option>Flight</option>
//               <option>Train</option>
//               <option>Bus</option>
//               <option>Boat</option>
//               <option>Other</option>
//             </select>
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageMeals">Meals:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageMeals"
//               value={formData.packageMeals}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packageActivities">Activities:</label>
//             <textarea
//               type="text"
//               className="border border-black rounded resize-none"
//               id="packageActivities"
//               value={formData.packageActivities}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="packagePrice">Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packagePrice"
//               value={formData.packagePrice}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex items-center gap-2 w-full">
//             <label htmlFor="packageOffer">Offer:</label>
//             <input
//               type="checkbox"
//               className="border border-black rounded w-4 h-4"
//               id="packageOffer"
//               checked={formData.packageOffer}
//               onChange={handleChange}
//             />
//           </div>
//           <div
//             className={`${
//               formData.packageOffer ? "flex flex-col w-full" : "hidden"
//             }`}
//           >
//             <label htmlFor="packageDiscountPrice">Discount Price:</label>
//             <input
//               type="number"
//               className="border border-black rounded"
//               id="packageDiscountPrice"
//               value={formData.packageDiscountPrice}
//               onChange={handleChange}
//             /> 
//           </div> 
//         {/* Additional Fields */}
//         {/* Add other fields as per your existing code */}
//         <div className="flex flex-col w-full">
//           <label htmlFor="packageImages">
//             Images:
//             <span className="text-red-700 text-sm">
//               (Max 5 images, each &lt; 2MB)
//             </span>
//           </label>
//           <input
//             type="file"
//             multiple
//             className="border border-black rounded"
//             id="packageImages"
//             onChange={(e) => setImages(e.target.files)}
//           />
//         </div>
//         {imageUploadError && (
//           <p className="text-red-600">{imageUploadError}</p>
//         )}
//         <button
//           type="button"
//           disabled={uploading || loading}
//           className="bg-blue-600 text-white p-2 rounded w-full"
//           onClick={handleImageSubmit}
//         >
//           {uploading ? "Uploading..." : "Upload Images"}
//         </button>

//         <button
//           disabled={uploading || loading}
//           className="bg-green-700 text-white p-2 rounded w-full"
//         >
//           {loading ? "Submitting..." : "Add Package"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPackages;








// //src/pages/admin/Addpackages.jsx
import React, { useState } from "react";

const AddPackages = () => {
  const [formData, setFormData] = useState({
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
    packageImages: [],
  });
  const [images, setImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
  };

  const handleImageSubmit = async () => {
    if (images.length === 0) {
      setImageUploadError("No images selected for upload.");
      return;
    }

    if (images.length + formData.packageImages.length > 11) {
      setImageUploadError("You can upload a maximum of 10 images per package.");
      return;
    }

    setUploading(true);
    setImageUploadError("");
    try {
      const base64Images = await Promise.all(
        Array.from(images).map((image) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject("Image processing failed.");
          });
        })
      );

      setFormData({
        ...formData,
        packageImages: formData.packageImages.concat(base64Images),
      });
    } catch (err) {
      setImageUploadError(err || "Failed to process images.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (formData.packageImages.length === 0) {
      alert("At least one image is required.");
      return;
    }

    if (
      !formData.packageName ||
      !formData.packageDescription ||
      !formData.packageDestination ||
      !formData.packageAccommodation ||
      !formData.packageTransportation ||
      !formData.packageMeals ||
      !formData.packageActivities
    ) {
      alert("All fields are required.");
      return;
    }

    if (formData.packagePrice <= 0 || formData.packagePrice < formData.packageDiscountPrice) {
      alert("Ensure valid price values.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/package/create-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "An error occurred.");
        return;
      }

      alert("Package created successfully!");
      setFormData({
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
        packageImages: [],
      });
      setImages([]);
    } catch (err) {
      setError("Failed to submit package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-3">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 shadow-md rounded-xl p-3 gap-2 flex flex-col items-center"
      >
        <h1 className="text-center text-2xl font-semibold">Add Package</h1>

        {/* Form Fields */}
        <div className="flex flex-col w-full">
          <label htmlFor="packageName">Name:</label>
          <input
            type="text"
            className="border border-black rounded"
            id="packageName"
            value={formData.packageName}
            onChange={handleChange}
          />
        </div>

                          <div className="flex flex-col w-full">
             <label htmlFor="packageDescription">Description:</label>
             <textarea
              type="text"
              className="border border-black rounded resize-none"
              id="packageDescription"
              value={formData.packageDescription}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="packageDestination">Destination:</label>
            <input
              type="text"
              className="border border-black rounded"
              id="packageDestination"
              value={formData.packageDestination}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap w-full gap-2">
            <div className="flex flex-col flex-1">
              <label htmlFor="packageDays">Days:</label>
              <input
                type="number"
                className="border border-black rounded"
                id="packageDays"
                value={formData.packageDays}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="packageNights">Nights:</label>
              <input
                type="number"
                className="border border-black rounded"
                id="packageNights"
                value={formData.packageNights}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="packageAccommodation">Accommodation:</label>
            <textarea
              type="text"
              className="border border-black rounded resize-none"
              id="packageAccommodation"
              value={formData.packageAccommodation}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="packageTransportation">Transportation:</label>
            <select
              className="border border-black rounded-lg"
              id="packageTransportation"
              onChange={handleChange}
            >
              <option>Select</option>
              <option>Flight</option>
              <option> International flights + domestic transfers</option>
              <option>Flights + seaplane transfers</option>
              <option>Flights + Swiss rail pass</option>
              <option>Flights + luxury transfers</option>
              <option>Flights + city subway pass</option>
              <option>Flights + Round-trip seaplane transfers</option>
              <option>Flight + boat transfers to reef islands</option>
              <option> Flight (International + local transfers)</option>
              <option>Train</option>
              <option>Luxury Bus</option>
              <option>Flights + Private Car + Volvo Bus</option>
              <option>Private Vehicles, Luxury Buses, Trains (optional for long distances)</option>
              <option>Private car with a chauffeur for transfers and sightseeing</option>
              <option>Private AC vehicle for all transfers and sightseeing</option>
              <option>Private AC vehicle for temple visits and sightseeing</option>
              <option>International flights + private transfers + metro pass</option>
              <option>Private AC vehicle for all transfers, houseboat cruise in Alleppey, and optional domestic flights</option>
              <option>Flights + ferry transfers + private vehicle</option>
              <option>Private AC vehicle for transfers, train to Himachal, and local sightseeing transport</option>
             
              
              <option>Boat</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="packageMeals">Meals:</label>
            <textarea
              type="text"
              className="border border-black rounded resize-none"
              id="packageMeals"
              value={formData.packageMeals}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="packageActivities">Activities:</label>
            <textarea
              type="text"
              className="border border-black rounded resize-none"
              id="packageActivities"
              value={formData.packageActivities}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="packagePrice">Price:₹</label>
            <input
              type="number"
              className="border border-black rounded"
              id="packagePrice"
              value={formData.packagePrice}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <label htmlFor="packageOffer">Offer:</label>
            <input
              type="checkbox"
              className="border border-black rounded w-4 h-4"
              id="packageOffer"
              checked={formData.packageOffer}
              onChange={handleChange}
            />
          </div>
          <div
            className={`${
              formData.packageOffer ? "flex flex-col w-full" : "hidden"
            }`}
          >
            <label htmlFor="packageDiscountPrice">Discount Price:</label>
            <input
              type="number"
              className="border border-black rounded"
              id="packageDiscountPrice"
              value={formData.packageDiscountPrice}
              onChange={handleChange}
            /> 
          </div> 
        {/* Additional Fields */}
        {/* Add other fields as per your existing code */}
        <div className="flex flex-col w-full">
          <label htmlFor="packageImages">
            Images:
            <span className="text-red-700 text-sm">
              (Max 10 images, each &lt; 2MB)
            </span>
          </label>
          <input
            type="file"
            multiple
            className="border border-black rounded"
            id="packageImages"
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        {imageUploadError && (
          <p className="text-red-600">{imageUploadError}</p>
        )}
        <button
          type="button"
          disabled={uploading || loading}
          className="bg-blue-600 text-white p-2 rounded w-full"
          onClick={handleImageSubmit}
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>

        <button
          disabled={uploading || loading}
          className="bg-green-700 text-white p-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Add Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackages;
