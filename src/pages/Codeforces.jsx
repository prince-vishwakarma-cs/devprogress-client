import React from 'react';
import { useSelector } from 'react-redux';
import { useCodeforcesQuery } from '../redux/api/platformAPI';
import { RatingChart } from '../components/RatingChart';

const Codeforces = () => {
  const { user } = useSelector((state) => state.auth);
  const codeforcesUrl = user.user?.platform_url?.codeforces;

  const { data: codeforcesdata, isLoading: codeforcesLoading } =
    useCodeforcesQuery({
      username: codeforcesUrl,
    });

  if (codeforcesLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full text-xl">
        Loading...
      </div>
    );
  }

  if (!codeforcesdata?.status || !codeforcesdata?.result) {
    return (
      <div className="flex justify-center items-center w-full h-full text-xl text-red-500">
        Failed to fetch data
      </div>
    );
  }

  console.log(codeforcesdata.result)

  const {
    contribution,
    lastOnlineTimeSeconds,
    rating,
    friendOfCount,
    titlePhoto,
    rank,
    handle,
    maxRating,
    avatar,
    registrationTimeSeconds,
    maxRank,
  } = codeforcesdata.result[0];

  return (
    <div className="flex flex-col items-center w-full !p-6">
      {/* Profile & Info */}
      <div className="shadow-lg rounded-2xl p-6 w-full max-w-lg flex flex-col items-center">
        <img
          src={avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4"
        />
        <h2 className="text-2xl font-semibold mt-4">{handle}</h2>
        <div className="flex items-center mt-2">
          <span className="text-lg">{rank}</span>
        </div>
        <p className="text-lg mt-2">Contribution: {contribution}</p>
      </div>

      {/* Rating & Rank */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Current Rating</span>
          <span className="text-xl font-bold">{rating || "N/A"}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Max Rating</span>
          <span className="text-xl font-bold">{maxRating || "N/A"}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Max Rank</span>
          <span className="text-xl font-bold">{maxRank || "N/A"}</span>
        </div>
      </div>

      {/* Registration & Last Online */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Registration Time</span>
          <span className="text-xl font-bold">
            {new Date(registrationTimeSeconds * 1000).toLocaleDateString() || "N/A"}
          </span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Last Online</span>
          <span className="text-xl font-bold">
            {new Date(lastOnlineTimeSeconds * 1000).toLocaleString() || "N/A"}
          </span>
        </div>
      </div>

      {/* Friend Count */}
      <div className="grid grid-cols-1 gap-4 mt-6 w-full max-w-lg">
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Friends</span>
          <span className="text-xl font-bold">{friendOfCount || "0"}</span>
        </div>
      </div>

      {/* Rating History Chart */}
      {codeforcesdata.result.rating && (
        <RatingChart ratingData={codeforcesdata.result.rating} />
      )}
    </div>
  );
};

export default Codeforces;
