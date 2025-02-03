import React from "react";
// import { useSelector } from "react-redux";
// import { useGfgQuery } from "../redux/api/platformAPI";

const GeeksForGeeks = () => {
  // const { user } = useSelector((state) => state.auth);
  // const gfgurl = user.user?.platform_url?.gfg;

  // const { data: gfgdata, isLoading: gfgloading } = useGfgQuery({
  //   username: gfgurl,
  // });

  // If data is still loading, show a loading spinner or message
  // if (gfgloading) {
  //   return (
  //     <div className="text-primary-text flex justify-center items-center w-full h-full">
  //       <div>Loading...</div>
  //     </div>
  //   );
  // }

  // const { info, solvedStats } = gfgdata;

  // const {
  //   userName,
  //   profilePicture,
  //   instituteRank,
  //   currentStreak,
  //   maxStreak,
  //   institution,
  //   languagesUsed,
  //   campusAmbassador,
  //   codingScore,
  //   totalProblemsSolved,
  //   monthlyCodingScore,
  //   articlesPublished,
  // } = info;

  // const { school, basic, easy, medium, hard } = solvedStats;

  // each of one in solvedstats consist of count and questiions in which questions is an array of object which consist question and question url but i do not wnat it jsu want the cound of them

  return (
    <div className="flex justify-center items-center w-full h-full p-5 ">
      GeeksForGeeeks: Soon Adding....
    </div>
  );
};

export default GeeksForGeeks;
