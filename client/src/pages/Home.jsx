// //src/pages/Home.jsx
// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const getTopPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=packageRating&limit=8"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setTopPackages(data?.packages);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [topPackages]);

//   const getLatestPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=createdAt&limit=8"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setLatestPackages(data?.packages);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [latestPackages]);

//   const getOfferPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=createdAt&offer=true&limit=6"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setOfferPackages(data?.packages);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [offerPackages]);

//   useEffect(() => {
//     getTopPackages();
//     getLatestPackages();
//     getOfferPackages();
//   }, []);

//   return (
//     <div className="main w-full">
//       <div className="w-full flex flex-col">
//         <div className="backaground_image w-full"></div>
//         <div className="top-part w-full gap-2 flex flex-col">
//           <h1 className="text-white text-4xl text-center font-bold underline mb-2">
//           Discover the Ultimate Travel Guide
//           </h1>
//           <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
//           Transforming travel wishes into cherished memories
//           </h1>
//           <div className="w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//               }}
//             />
//             <button
//               onClick={() => {
//                 navigate(`/search?searchTerm=${search}`);
//               }}
//               className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
//             >
//               Go
//               {/* <FaSearch className="" /> */}
//             </button>
//           </div>
//           <div className="w-[90%] max-w-xl flex justify-center mt-10">
//             <button
//               onClick={() => {
//                 navigate("/search?offer=true");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-e border-white rounded-s-full flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Best Offers
//               <LuBadgePercent className="text-2xl" />
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/search?sort=packageRating");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Top Rated
//               <FaStar className="text-2xl" />
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/search?sort=createdAt");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Latest
//               <FaCalendar className="text-lg" />
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/search?sort=packageTotalRatings");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-s border-white rounded-e-full flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Most Rated
//               <FaRankingStar className="text-2xl" />
//             </button>
//           </div>
//         </div>
//         {/* main page */}
//         <div className="main p-6 flex flex-col gap-5">
//           {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//           {!loading &&
//             topPackages.length === 0 &&
//             latestPackages.length === 0 &&
//             offerPackages.length === 0 && (
//               <h1 className="text-center text-2xl">No Packages Yet!</h1>
//             )}
//           {/* Top Rated */}
//           {!loading && topPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Top Packages</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {topPackages.map((packageData, i) => {
//                   return <PackageCard key={i} packageData={packageData} />;
//                 })}
//               </div>
//             </>
//           )}
//           {/* Top Rated */}
//           {/* latest */}
//           {!loading && latestPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Latest Packages</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {latestPackages.map((packageData, i) => {
//                   return <PackageCard key={i} packageData={packageData} />;
//                 })}
//               </div>
//             </>
//           )}
//           {/* latest */}
//           {/* offer */}
//           {!loading && offerPackages.length > 0 && (
//             <>
//               <div className="offers_img"></div>
//               <h1 className="text-2xl font-semibold">Best Offers</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {offerPackages.map((packageData, i) => {
//                   return <PackageCard key={i} packageData={packageData} />;
//                 })}
//               </div>
//             </>
//           )}
//           {/* offer */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;




//home.jsx
import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css";
import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [latestPackages, setLatestPackages] = useState([]);
  const [offerPackages, setOfferPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getTopPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=packageRating&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setTopPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getLatestPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setLatestPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getOfferPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&offer=true&limit=6"
      );
      const data = await res.json();
      if (data?.success) {
        setOfferPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTopPackages();
    getLatestPackages();
    getOfferPackages();
  }, []);

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        <div className="backaground_image w-full"></div>
        <div className="top-part w-full gap-2 flex flex-col">
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            Discover the Ultimate Travel Guide
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            Transforming travel wishes into cherished memories
          </h1>
          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => navigate(`/search?searchTerm=${search}`)}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
            </button>
          </div>
          <div className="w-[90%] max-w-xl flex justify-center mt-10">
            {[
              { label: "Best Offers", sort: "offer=true", icon: <LuBadgePercent className="text-2xl" /> },
              { label: "Top Rated", sort: "packageRating", icon: <FaStar className="text-2xl" /> },
              { label: "Latest", sort: "createdAt", icon: <FaCalendar className="text-lg" /> },
              { label: "Most Rated", sort: "packageTotalRatings", icon: <FaRankingStar className="text-2xl" /> }
            ].map(({ label, sort, icon }, index) => (
              <button
                key={index}
                onClick={() => navigate(`/search?sort=${sort}`)}
                className={`flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-white flex-1 ${
                  index === 0 ? "border-e rounded-s-full" : index === 3 ? "border-s rounded-e-full" : "border-x"
                } hover:scale-105 transition-all duration-150`}
              >
                {label} {icon}
              </button>
            ))}
          </div>
        </div>
        <div className="main p-6 flex flex-col gap-5">
          {loading && <h1 className="text-center text-2xl">Loading...</h1>}
          {!loading &&
            topPackages.length === 0 &&
            latestPackages.length === 0 &&
            offerPackages.length === 0 && (
              <h1 className="text-center text-2xl">No Packages Yet!</h1>
            )}
          {/* Top Rated */}
          {!loading && topPackages.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Top Packages</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
                {topPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* Latest */}
          {!loading && latestPackages.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Latest Packages</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
                {latestPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* Offer */}
          {!loading && offerPackages.length > 0 && (
            <>
              <div className="offers_img"></div>
              <h1 className="text-2xl font-semibold">Best Offers</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
                {offerPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;




// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   // Function to fetch top packages
//   const getTopPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=packageRating&limit=8"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setTopPackages(data?.packages);
//       } else {
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Error fetching top packages:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Function to fetch latest packages
//   const getLatestPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=createdAt&limit=8"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setLatestPackages(data?.packages);
//       } else {
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Error fetching latest packages:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Function to fetch offer packages
//   const getOfferPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?offer=true&limit=6"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setOfferPackages(data?.packages);
//       } else {
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Error fetching offer packages:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch data when component mounts
//   useEffect(() => {
//     getTopPackages();
//     getLatestPackages();
//     getOfferPackages();
//   }, [getTopPackages, getLatestPackages, getOfferPackages]);

//   return (
//     <div className="main w-full">
//       <div className="w-full flex flex-col">
//         <div className="background_image w-full"></div>
//         <div className="top-part w-full gap-2 flex flex-col">
//           <h1 className="text-white text-4xl text-center font-bold underline mb-2">
//             The Travel Index
//           </h1>
//           <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
//             Make Your Travel Dream Come True With Our Amazing Packages
//           </h1>
//           <div className="w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//               }}
//             />
//             <button
//               onClick={() => {
//                 navigate(`/search?searchTerm=${search}`);
//               }}
//               className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
//             >
//               Go
//             </button>
//           </div>
//         </div>

//         {/* main page */}
//         <div className="main p-6 flex flex-col gap-5">
//           {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//           {!loading && !topPackages.length && !latestPackages.length && !offerPackages.length && (
//             <h1 className="text-center text-2xl">No Packages Available!</h1>
//           )}

//           {/* Top Rated */}
//           {!loading && topPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Top Packages</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {topPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Latest Packages */}
//           {!loading && latestPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Latest Packages</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {latestPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Best Offers */}
//           {!loading && offerPackages.length > 0 && (
//             <>
//               <div className="offers_img"></div>
//               <h1 className="text-2xl font-semibold">Best Offers</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {offerPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React, { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import PackageCard from "./PackageCard";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const fetchPackages = useCallback(async (query, setter) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/package/get-packages?${query}`);
//       const data = await res.json();
//       if (data.success) {
//         setter(data.packages);
//       } else {
//         alert(data.message || "Error fetching packages");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages("sort=packageRating&limit=8", setTopPackages);
//     fetchPackages("sort=createdAt&limit=8", setLatestPackages);
//     fetchPackages("offer=true&limit=6", setOfferPackages);
//   }, [fetchPackages]);

//   return (
//     <div className="main">
//       <h1>Top Packages</h1>
//       <div>
//         {topPackages.map((pkg) => (
//           <PackageCard key={pkg._id} packageData={pkg} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;




















// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const fetchPackages = useCallback(async (query, setter) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/package/get-packages?${query}`);
//       const data = await response.json();
//       if (data.success) {
//         setter(data.packages);
//       } else {
//         alert(data.message || "Error fetching packages.");
//       }
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPackages("sort=packageRating&limit=8", setTopPackages);
//     fetchPackages("sort=createdAt&limit=8", setLatestPackages);
//     fetchPackages("offer=true&limit=6", setOfferPackages);
//   }, [fetchPackages]);

//   const handleSearch = () => {
//     navigate(`/search?searchTerm=${search}`);
//   };

//   return (
//     <div className="main w-full">
//       <div className="header w-full flex flex-col items-center">
//         <div className="background_image w-full"></div>
//         <div className="top-part w-full gap-4 flex flex-col items-center text-center">
//           <h1 className="text-white text-4xl font-bold underline mb-2">
//             The Travel Index
//           </h1>
//           <p className="text-white text-lg font-semibold">
//             Make Your Travel Dream Come True With Our Amazing Packages
//           </p>
//           <div className="search-bar w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="search-input rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
//             >
//               <FaSearch />
//             </button>
//           </div>
//           <div className="filter-buttons w-[90%] max-w-xl flex justify-center mt-10 gap-2">
//             <button
//               onClick={() => navigate("/search?offer=true")}
//               className="filter-btn flex items-center gap-x-2 bg-slate-400 text-white p-2 rounded hover:scale-105 transition-all duration-150"
//             >
//               Best Offers <LuBadgePercent />
//             </button>
//             <button
//               onClick={() => navigate("/search?sort=packageRating")}
//               className="filter-btn flex items-center gap-x-2 bg-slate-400 text-white p-2 rounded hover:scale-105 transition-all duration-150"
//             >
//               Top Rated <FaStar />
//             </button>
//             <button
//               onClick={() => navigate("/search?sort=createdAt")}
//               className="filter-btn flex items-center gap-x-2 bg-slate-400 text-white p-2 rounded hover:scale-105 transition-all duration-150"
//             >
//               Latest <FaCalendar />
//             </button>
//             <button
//               onClick={() => navigate("/search?sort=packageTotalRatings")}
//               className="filter-btn flex items-center gap-x-2 bg-slate-400 text-white p-2 rounded hover:scale-105 transition-all duration-150"
//             >
//               Most Rated <FaRankingStar />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="content p-6 flex flex-col gap-6">
//         {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//         {!loading &&
//           topPackages.length === 0 &&
//           latestPackages.length === 0 &&
//           offerPackages.length === 0 && (
//             <h1 className="text-center text-2xl">No Packages Yet!</h1>
//           )}

//         {!loading && topPackages.length > 0 && (
//           <div className="package-section">
//             <h2 className="section-title">Top Packages</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {topPackages.map((pkg, index) => (
//                 <PackageCard key={index} packageData={pkg} />
//               ))}
//             </div>
//           </div>
//         )}

//         {!loading && latestPackages.length > 0 && (
//           <div className="package-section">
//             <h2 className="section-title">Latest Packages</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {latestPackages.map((pkg, index) => (
//                 <PackageCard key={index} packageData={pkg} />
//               ))}
//             </div>
//           </div>
//         )}

//         {!loading && offerPackages.length > 0 && (
//           <div className="package-section">
//             <h2 className="section-title">Best Offers</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {offerPackages.map((pkg, index) => (
//                 <PackageCard key={index} packageData={pkg} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
