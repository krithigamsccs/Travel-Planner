// import aboutImg from "../assets/images/about_img.png";
// import { FaExternalLinkAlt } from "react-icons/fa";

// const About = () => {
//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-[90%] max-w-2xl rounded-xl shadow-xl p-3 flex flex-col gap-3">
//         <h1 className="text-4xl text-center font-semibold">About</h1>
//         <div className="w-max flex flex-col">
//           <img src={aboutImg} className="w-40 h-40" alt="Image" />
//           <h1 className="text-xl font-semibold text-center">Krithiga T</h1>
//         </div>
//         <ul className="list-disc w-max mx-5">
//           <li className="hover:underline hover:text-blue-600 cursor-pointer">
//             <a
//               className="flex items-center gap-2"
//               href=""
//               target="_blank"
//             >
//               Git-Hub <FaExternalLinkAlt />
//             </a>
//           </li>
//           <li className="hover:underline hover:text-blue-600 cursor-pointer">
//             <a
//               className="flex items-center gap-2"
//               href=""
//               target="_blank"
//             >
//               LinkedIn <FaExternalLinkAlt />
//             </a>
//           </li>
//         </ul>
//         <p>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
//           aliquam voluptatibus odit, saepe exercitationem autem molestias
//           asperiores dolores sit corrupti molestiae ea, facere, totam
//           necessitatibus enim quod aliquid. Quisquam, dolor. aliquam
//           voluptatibus odit, saepe exercitationem autem molestias asperiores
//           dolores sit corrupti molestiae ea, facere, totam necessitatibus enim
//           quod aliquid. Quisquam, dolor.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;




// import aboutImg from "../assets/images/about_img.png";
// import { FaExternalLinkAlt } from "react-icons/fa";

// const About = () => {
//   return (
//     <div className="w-full flex justify-center py-12 bg-gradient-to-b from-gray-50 to-gray-200">
//       <div className="w-[90%] max-w-3xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 transition-transform transform hover:scale-105">
//         <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">About Me</h1>
//         <div className="flex flex-col items-center text-center">
//           <img
//             src={aboutImg}
//             className="w-36 h-36 rounded-full shadow-lg border-4 border-blue-950"
//             alt="Profile"
//           />
//           <h2 className="text-2xl font-semibold text-gray-800 mt-4">Krithiga T</h2>
//           <p className="text-lg text-gray-600">Full Stack Developer</p>
//         </div>
//         <p className="text-center text-gray-700 leading-relaxed px-6 text-lg">
//           I am a passionate Full Stack Developer dedicated to building modern, scalable web applications.
//           With expertise in the MERN stack, I focus on creating efficient, user-friendly solutions.
//           My commitment to continuous learning and innovation drives me to explore new technologies and
//           implement best practices in development.
//         </p>
//         <div className="flex gap-6 text-lg">
//           <a
//             className="flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-lg shadow-md transition duration-300"
//             href="https://github.com/krithigamsccs"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             GitHub <FaExternalLinkAlt />
//           </a>
//           <a
//             className="flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-lg shadow-md transition duration-300"
//             href="https://www.linkedin.com/in/krithiga-t/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             LinkedIn <FaExternalLinkAlt />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;





import travelImg from "../assets/images/logo.png";
import { FaExternalLinkAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full flex justify-center py-12 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="w-[90%] max-w-3xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">About</h1>
        <div className="flex flex-col items-center text-center">
          <img
            src={travelImg}
            className="w-36 h-36 rounded-full shadow-lg border-4 border-blue-950"
            alt="Travel Planner Logo"
          />
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide"> 🌍Travel & Tourism ✈ </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Your Ultimate Travel Companion 🏕</h2>
          <p className="text-lg text-gray-600">Plan, explore, and create unforgettable experiences 🌟</p>
        </div>
        <p className="text-center text-gray-700 leading-relaxed px-6 text-lg">
          Travel Planner ✨ simplifies your journey with seamless itinerary planning, expense tracking, and destination discovery—all in one place. Whether it's a solo adventure 🧳 or a family getaway 🏖, we make every trip effortless and memorable.
        </p>
        <div className="flex gap-6 text-lg">
          <a
            className="flex items-center gap-2 text-white bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-lg shadow-md transition duration-300"
            href="https://github.com/krithigamsccs"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 🚀 <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;




