import React from "react";
import { useCodefchefQuery } from "../redux/api/platformAPI";
import { useSelector } from "react-redux";
import { RatingChart } from "../components/RatingChart";
import { LoadingScreenExtras } from "../components/LoadingScreenExtras";

const Codechef = () => {
  const { user } = useSelector((state) => state.auth);
  const codechefUrl = user.user?.platform_url?.codechef;
  const {
    data: codechefData,
    isLoading: codechefLoading,
    error,
  } = useCodefchefQuery({
    username: codechefUrl,
  });

  if (!codechefUrl || codechefUrl === "") {
    return (
      <div className="flex justify-center items-center w-full h-full text-xl text-red-500">
        Add User handle to get stats
      </div>
    );
  }

  if (codechefLoading) {
    return (
      <LoadingScreenExtras/>
    );
  }

  if (!codechefData?.success) {
    return (
      <div className="flex justify-center items-center w-full h-full text-xl text-red-500">
        Failed to fetch data
      </div>
    );
  }

  console.log(error);

  const {
    profile,
    name,
    currentRating,
    highestRating,
    countryFlag,
    countryName,
    globalRank,
    countryRank,
    stars,
    heatMap,
    ratingData,
  } = codechefData;
  return (
    <div className="flex flex-col items-center w-full !p-6">
      {/* Profile & Info */}
      <div className=" rounded-2xl p-6 w-full max-w-lg flex flex-col items-center">
        <img
          src={profile}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4"
        />
        <h2 className="text-2xl font-semibold mt-4">{name}</h2>
        <div className="flex items-center mt-2">
          <img src={countryFlag} alt="Flag" className="w-6 h-6 mr-2" />
          <span className="text-lg">{countryName}</span>
        </div>
      </div>

      {/* Rating & Rank */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        <div className=" rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Stars</span>
          <span className="text-xl font-bold">{stars || "Unrated"}</span>
        </div>
        <div className=" rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Current Rating</span>
          <span className="text-xl font-bold">
            {currentRating !== null ? currentRating : "N/A"}
          </span>
        </div>
        <div className=" rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Highest Rating</span>
          <span className="text-xl font-bold">
            {highestRating !== null ? highestRating : "N/A"}
          </span>
        </div>
        <div className=" rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Global Rank</span>
          <span className="text-xl font-bold">
            {globalRank !== null ? globalRank : "N/A"}
          </span>
        </div>
        <div className=" rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Country Rank</span>
          <span className="text-xl font-bold">
            {countryRank !== null ? countryRank : "N/A"}
          </span>
        </div>
      </div>

      {/* Rating History Table */}
      <RatingChart ratingData={ratingData} />
    </div>
  );
};

export default Codechef;
