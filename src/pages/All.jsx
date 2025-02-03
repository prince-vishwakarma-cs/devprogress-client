import React from "react";
import { Userinfo } from "../components/Userinfo";
import { useSelector } from "react-redux";
import {
  useCodefchefQuery,
  useCodeforcesQuery,
  useGfgQuery,
  useLeetcodeQuery,
} from "../redux/api/platformAPI";

const All = () => {
    const { user } = useSelector((state) => state.auth);
    const gfgurl = user.user?.platform_url?.gfg;
    const codechefUrl = user.user?.platform_url?.codechef;
    const codeforcesUrl = user.user?.platform_url?.codeforces;
    const leetcodeUrl = user.user?.platform_url?.leetcode;
  
    const { data: gfgdata, isLoading: gfgloading } = useGfgQuery({
      username: gfgurl,
    });
  
    const { data: codechefdata, isLoading: codechefLoading } = useCodefchefQuery({
      username: codechefUrl,
    });
  
    const { data: leetcodedata, isLoading: leetcodeLoading,error } = useLeetcodeQuery({
      username: leetcodeUrl,
    });
    
    const { data: codeforcesdata, isLoading: codeforcesLoading } =
      useCodeforcesQuery({
        username: codeforcesUrl,
      });
  
    if (gfgloading || codechefLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="text-primary-text flex justify-between w-full">
        <div className="flex flex-col flex-wrap">
          <div>
            Gfg : <br />
            {JSON.stringify(gfgdata)}
          </div>
          <div>
            CodeChef : <br />
            {JSON.stringify(codechefdata)}
          </div>
          <div>
            CodeForces : <br />
            {JSON.stringify(codeforcesdata)}
          </div>
          <div>
            Leetcode : <br />
            {JSON.stringify(leetcodedata)}
          </div>
        </div>
      </div>
    );
}

export default All



