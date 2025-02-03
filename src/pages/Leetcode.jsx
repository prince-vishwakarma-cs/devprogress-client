import React from 'react';
import { useSelector } from 'react-redux';
import { useLeetcodebadgesQuery, useLeetcodeQuery, useLeetcodesolvedQuery } from '../redux/api/platformAPI';

const Leetcode = () => {
  const { user } = useSelector((state) => state.auth);
  const leetcodeUrl = user.user?.platform_url?.leetcode;

  // Call both hooks outside any conditional rendering
  const { data: leetcodedata, isLoading: leetcodeLoading, error } = useLeetcodeQuery({
    username: leetcodeUrl,
  });

  const { data: leetcodebadgedata, isLoading: leetcodebadgeLoading } = useLeetcodebadgesQuery({
    username: leetcodeUrl,
  });
  
  const { data: leetcodesolveddata, isLoading: leetcodesolvedLoading } = useLeetcodesolvedQuery({
    username: leetcodeUrl,
  });

  if (leetcodeLoading || leetcodebadgeLoading || leetcodesolvedLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    console.error(error); // Log for debugging
    return (
      <div className="flex justify-center items-center w-full h-full text-xl text-red-500">
        Failed to fetch data. Please try again later.
      </div>
    );
  }

  const {
    username,
    name,
    birthday,
    avatar,
    ranking,
    reputation,
    gitHub,
    twitter,
    linkedIN,
    website,
    country,
    company,
    school,
    skillTags,
    about,
  } = leetcodedata || {}; // Use fallback if data is not available

  const badges = leetcodebadgedata?.badges || []; // Fallback if no badges data

  const solvedProblem = leetcodesolveddata?.solvedProblem || 'N/A';
  const easySolved = leetcodesolveddata?.easySolved || 'N/A';
  const mediumSolved = leetcodesolveddata?.mediumSolved || 'N/A';
  const hardSolved = leetcodesolveddata?.hardSolved || 'N/A';

  return (
    <div className="flex flex-col items-center w-full p-6">
      {/* Profile Section */}
      <div className="shadow-lg rounded-2xl p-6 w-full max-w-lg flex flex-col items-center">
        <img
          src={avatar || 'default-avatar-url'} // Fallback for avatar
          alt="Profile"
          className="w-24 h-24 rounded-full border-4"
        />
        <h2 className="text-2xl font-semibold mt-4">{name || 'No Name'}</h2>
        <p className="text-lg mt-2">{username || 'No Username'}</p>
        <p className="text-lg mt-2">Birthday: {birthday || 'N/A'}</p>
        <p className="text-lg mt-2">Country: {country || 'N/A'}</p>
      </div>

      {/* Ranking & Reputation */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Ranking</span>
          <span className="text-xl font-bold">{ranking || 'N/A'}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Reputation</span>
          <span className="text-xl font-bold">{reputation || 'N/A'}</span>
        </div>
      </div>

      {/* Solved Problems */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Total Solved</span>
          <span className="text-xl font-bold">{solvedProblem}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Easy Solved</span>
          <span className="text-xl font-bold">{easySolved}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Medium Solved</span>
          <span className="text-xl font-bold">{mediumSolved}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Hard Solved</span>
          <span className="text-xl font-bold">{hardSolved}</span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mt-6 w-full max-w-lg text-center">
        <h3 className="text-xl font-bold">Badges</h3>
        <div className="flex flex-wrap justify-center mt-4">
          {badges.length > 0 ? (
            badges.map((badge) => {
              const badgeIcon = badge.icon.startsWith('/static')
                ? `https://leetcode.com${badge.icon}`
                : badge.icon;

              return (
                <div key={badge.id} className="p-4 m-2 flex flex-col items-center">
                  <img src={badgeIcon} alt={badge.displayName} className="w-20 h-20" />
                  <p className="text-sm mt-2">{badge.displayName}</p>
                </div>
              );
            })
          ) : (
            <p>No badges available.</p>
          )}
        </div>
      </div>

      {/* Social Links & More Info */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        {gitHub && (
          <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
            <span className="text-secondary-text">GitHub</span>
            <a href={gitHub} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-500">
              GitHub Profile
            </a>
          </div>
        )}
        {twitter && (
          <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
            <span className="text-secondary-text">Twitter</span>
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-500">
              Twitter Profile
            </a>
          </div>
        )}
        {linkedIN && (
          <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
            <span className="text-secondary-text">LinkedIn</span>
            <a href={linkedIN} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-500">
              LinkedIn Profile
            </a>
          </div>
        )}
        {website && (
          <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
            <span className="text-secondary-text">Website</span>
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-500">
              Personal Website
            </a>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="mt-6 w-full max-w-lg text-center">
        <p className="text-lg">{about || 'No information available about the user.'}</p>
      </div>

      {/* Skill Tags */}
      {skillTags && skillTags.length > 0 && (
        <div className="mt-6 w-full max-w-lg text-center">
          <h3 className="text-xl font-bold">Skills</h3>
          <ul className="flex flex-wrap justify-center mt-4">
            {skillTags.map((tag, index) => (
              <li key={index} className="bg-blue-100 text-blue-800 rounded-full px-4 py-2 m-2">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Company & School */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">Company</span>
          <span className="text-xl font-bold">{company || 'N/A'}</span>
        </div>
        <div className="shadow-md rounded-xl p-4 flex flex-col items-center">
          <span className="text-secondary-text">School</span>
          <span className="text-xl font-bold">{school || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default Leetcode;
