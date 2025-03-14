// import { Rating } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { FaClock } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const PackageCard = ({ packageData }) => {
//   return (
//     <Link to={`/package/${packageData._id}`} className="w-full">
//       <div className="w-full bg-white border flex flex-col items-center p-3 rounded shadow-md overflow-hidden">
//         <img
//           className="w-full h-[220px] rounded border hover:scale-110  transition-all duration-300"
//           src={packageData.packageImages[0]}
//           alt="Package Image"
//         />
//         <div className="w-full flex flex-col my-2">
//           <p className="font-semibold text-lg capitalize w-[90%] xsm:w-[250px] truncate">
//             {packageData.packageName}
//           </p>
//           <p className="text-green-700 text-lg capitalize">
//             {packageData.packageDestination}
//           </p>
//           {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
//             <p className="flex text-lg items-center gap-2">
//               <FaClock />
//               {+packageData.packageDays > 0 &&
//                 (+packageData.packageDays > 1
//                   ? packageData.packageDays + " Days"
//                   : packageData.packageDays + " Day")}
//               {+packageData.packageDays > 0 &&
//                 +packageData.packageNights > 0 &&
//                 " - "}
//               {+packageData.packageNights > 0 &&
//                 (+packageData.packageNights > 1
//                   ? packageData.packageNights + " Nights"
//                   : packageData.packageNights + " Night")}
//             </p>
//           )}
//           {/* price & rating */}
//           <div className="flex flex-wrap justify-between">
//             {packageData.packageTotalRatings > 0 && (
//               <p className="flex items-center text-lg">
//                 <Rating
//                   value={packageData.packageRating}
//                   size="medium"
//                   readOnly
//                   precision={0.1}
//                 />
//                 ({packageData.packageTotalRatings})
//               </p>
//             )}
//             {packageData.offer && packageData.packageDiscountPrice ? (
//               <p className="flex gap-1">
//                 <span className="line-through text-gray-700">
//                 ₹{packageData.packagePrice}
//                 </span>
//                 -
//                 <span className="font-medium text-green-700">
//                 ₹{packageData.packageDiscountPrice}
//                 </span>
//               </p>
//             ) : (
//               <p className="font-medium text-green-700">
//                 ₹{packageData.packagePrice}
//               </p>
//             )}
//           </div>
//           {/* price & rating */}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PackageCard;




import React from "react";
import { Rating } from "@mui/material";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PackageCard = ({ packageData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: true, // Allows swiping on mobile
  };

  return (
    <Link to={`/package/${packageData._id}`} className="w-full">
      <div className="w-full bg-white border flex flex-col items-center p-3 rounded-lg shadow-md overflow-hidden">
        {/* Image Carousel */}
        <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px] rounded-md border overflow-hidden">
          <Slider {...settings}>
            {packageData.packageImages.map((image, index) => (
              <div key={index}>
                <img
                  className="w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px] object-cover"
                  src={image}
                  alt={`Package ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full flex flex-col my-2 px-2">
          {/* Package Name */}
          <p className="font-semibold text-base sm:text-lg capitalize truncate">
            {packageData.packageName}
          </p>

          {/* Destination */}
          <p className="text-green-700 text-sm sm:text-lg capitalize">
            {packageData.packageDestination}
          </p>

          {/* Duration (Days/Nights) */}
          {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
            <p className="flex text-sm sm:text-lg items-center gap-2">
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

          {/* Price & Rating */}
          <div className="flex flex-wrap justify-between items-center mt-1">
            {packageData.packageTotalRatings > 0 && (
              <p className="flex items-center text-sm sm:text-lg">
                <Rating
                  value={packageData.packageRating}
                  size="small"
                  readOnly
                  precision={0.1}
                />
                <span className="ml-1">({packageData.packageTotalRatings})</span>
              </p>
            )}
            {packageData.offer && packageData.packageDiscountPrice ? (
              <p className="flex gap-1 text-sm sm:text-base">
                <span className="line-through text-gray-700">
                  ₹{packageData.packagePrice}
                </span>
                <span className="font-medium text-green-700">
                  ₹{packageData.packageDiscountPrice}
                </span>
              </p>
            ) : (
              <p className="font-medium text-green-700 text-sm sm:text-lg">
                ₹{packageData.packagePrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
