// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PackageCard from "./PackageCard";

// const Search = () => {
//   const navigate = useNavigate();
//   const [sideBarSearchData, setSideBarSearchData] = useState({
//     searchTerm: "",
//     offer: false,
//     sort: "created_at",
//     order: "desc",
//   });
//   const [loading, setLoading] = useState(false);
//   const [allPackages, setAllPackages] = useState([]);
//   const [showMoreBtn, setShowMoreBtn] = useState(false);
//   //   console.log(listings);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     const offerFromUrl = urlParams.get("offer");
//     const sortFromUrl = urlParams.get("sort");
//     const orderFromUrl = urlParams.get("order");

//     if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
//       setSideBarSearchData({
//         searchTerm: searchTermFromUrl || "",
//         offer: offerFromUrl === "true" ? true : false,
//         sort: sortFromUrl || "created_at",
//         order: orderFromUrl || "desc",
//       });
//     }

//     const fetchAllPackages = async () => {
//       setLoading(true);
//       setShowMoreBtn(false);
//       try {
//         const searchQuery = urlParams.toString();
//         const res = await fetch(`/api/package/get-packages?${searchQuery}`);
//         const data = await res.json();
//         setLoading(false);
//         setAllPackages(data?.packages);
//         if (data?.packages?.length > 8) {
//           setShowMoreBtn(true);
//         } else {
//           setShowMoreBtn(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllPackages();
//   }, [location.search]);

//   const handleChange = (e) => {
//     if (e.target.id === "searchTerm") {
//       setSideBarSearchData({
//         ...sideBarSearchData,
//         searchTerm: e.target.value,
//       });
//     }
//     if (e.target.id === "offer") {
//       setSideBarSearchData({
//         ...sideBarSearchData,
//         [e.target.id]:
//           e.target.checked || e.target.checked === "true" ? true : false,
//       });
//     }
//     if (e.target.id === "sort_order") {
//       const sort = e.target.value.split("_")[0] || "created_at";

//       const order = e.target.value.split("_")[1] || "desc";

//       setSideBarSearchData({ ...sideBarSearchData, sort, order });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const urlParams = new URLSearchParams();
//     urlParams.set("searchTerm", sideBarSearchData.searchTerm);
//     urlParams.set("offer", sideBarSearchData.offer);
//     urlParams.set("sort", sideBarSearchData.sort);
//     urlParams.set("order", sideBarSearchData.order);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   const onShowMoreSClick = async () => {
//     const numberOfPackages = allPackages.length;
//     const startIndex = numberOfPackages;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set("startIndex", startIndex);
//     const searchQuery = urlParams.toString();
//     const res = await fetch(`/api/package/get-packages?${searchQuery}`);
//     const data = await res.json();
//     if (data?.packages?.length < 9) {
//       setShowMoreBtn(false);
//     }
//     setAllPackages([...allPackages, ...data?.packages]);
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
//         <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
//           <div className="flex items-center gap-2">
//             <label className="whitespace-nowrap font-semibold">Search:</label>
//             <input
//               type="text"
//               id="searchTerm"
//               placeholder="Search"
//               className="border rounded-lg p-3 w-full"
//               value={sideBarSearchData.searchTerm}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex gap-2 flex-wrap items-center">
//             <label className="font-semibold">Type:</label>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="offer"
//                 className="w-5"
//                 checked={sideBarSearchData.offer}
//                 onChange={handleChange}
//               />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Sort:</label>
//             <select
//               onChange={handleChange}
//               defaultValue={"created_at_desc"}
//               id="sort_order"
//               className="p-3 border rounded-lg"
//             >
//               <option value="packagePrice_desc">Price high to low</option>
//               <option value="packagePrice_asc">Price low to high</option>
//               <option value="packageRating_desc">Top Rated</option>
//               <option value="packageTotalRatings_desc">Most Rated</option>
//               <option value="createdAt_desc">Latest</option>
//               <option value="createdAt_asc">Oldest</option>
//             </select>
//           </div>
//           <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95">
//             Search
//           </button>
//         </form>
//       </div>
//       {/* ------------------------------------------------------------------------------- */}
//       <div className="flex-1">
//         <h1 className="text-xl font-semibold border-b p-3 text-slate-700 mt-5">
//           Package Results:
//         </h1>
//         <div className="w-full p-5 grid 2xl:grid-cols-4 xlplus:grid-cols-3 lg:grid-cols-2 gap-2">
//           {!loading && allPackages.length === 0 && (
//             <p className="text-xl text-slate-700">No Packages Found!</p>
//           )}
//           {loading && (
//             <p className="text-xl text-slate-700 text-center w-full">
//               Loading...
//             </p>
//           )}
//           {!loading &&
//             allPackages &&
//             allPackages.map((packageData, i) => (
//               <PackageCard key={i} packageData={packageData} />
//             ))}
//         </div>
//         {showMoreBtn && (
//           <button
//             onClick={onShowMoreSClick}
//             className="text-sm bg-green-700 text-white hover:underline p-2 m-3 rounded text-center w-max"
//           >
//             Show More
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;








import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";

const Search = () => {
  const navigate = useNavigate();
  const [sideBarSearchData, setSideBarSearchData] = useState({
    searchTerm: "",
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSideBarSearchData({
        searchTerm: searchTermFromUrl || "",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchAllPackages = async () => {
      setLoading(true);
      setShowMoreBtn(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/package/get-packages?${searchQuery}`);
        const data = await res.json();
        setLoading(false);
        setAllPackages(data?.packages || []);
        setShowMoreBtn(data?.packages?.length > 8);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPackages();
  }, [location.search]);

  const handleChange = (e) => {
    setSideBarSearchData({
      ...sideBarSearchData,
      [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sideBarSearchData);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = allPackages.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const res = await fetch(`/api/package/get-packages?${urlParams.toString()}`);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setAllPackages([...allPackages, ...data?.packages]);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="p-5 border-b md:border-r md:min-h-screen w-full md:w-1/4">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Search:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search"
              className="border rounded-lg p-2 w-full"
              value={sideBarSearchData.searchTerm}
              onChange={handleChange}
            />
          </div>
       

          <div className="flex items-center gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sideBarSearchData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>



          <div className="flex flex-col gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              id="sort_order"
              className="p-2 border rounded-lg w-full"
            >
              <option value="packagePrice_desc">Price high to low</option>
              <option value="packagePrice_asc">Price low to high</option>
              <option value="packageRating_desc">Top Rated</option>
              <option value="packageTotalRatings_desc">Most Rated</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-lg text-white p-2 uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 w-full p-5">
        <h1 className="text-lg font-semibold border-b pb-2 text-slate-700">Package Results:</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {loading && <p className="text-center text-xl text-slate-700">Loading...</p>}
          {!loading && allPackages.length === 0 && <p className="text-xl text-slate-700">No Packages Found!</p>}
          {!loading &&
            allPackages.map((packageData, i) => <PackageCard key={i} packageData={packageData} />)}
        </div>
        {showMoreBtn && (
          <button
            onClick={onShowMoreClick}
            className="bg-green-700 text-white text-sm hover:underline p-2 mt-4 rounded w-full sm:w-auto"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
