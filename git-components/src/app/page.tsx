"use client";

import ListItem from "../../components/ListItem";
import Subreddits from "../../components/Subreddits";
import { useEffect, useState } from "react";

const queryData = async () => {
  const spreadsheetId = "1xN1vs0iPZIzm5bMgeC4tXGeg9sC0Tk4itLqw9UtXTtQ";
  const response = await fetch(
    `https://api.graphqlsheet.com/api/${spreadsheetId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: "d87ab26073cb75fb3092b83affa4346e4751267e",
      },
      body: JSON.stringify({
        query: `
        {
          get (limit: 20) {
            Title,
            Url,
            Image,
            Views,
            PreviousRank,
            Join
          }
        }
      `,
      }),
    }
  );
  const responseJSON = await response.json();
  const data = responseJSON.data.get;
  const sortedData = [...data].sort(
    (a, b) => Number(b.Views) - Number(a.Views)
  );
  return sortedData;
};

export default function Home() {
  type SubredditData = {
    Title: string;
    Url: string;
    Image: string;
    Views: string;
    PreviousRank: number;
    Join: boolean;
  };

  const [subreddits, setSubreddits] = useState<SubredditData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await queryData();
      setSubreddits(result);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen p-4 w-full flex justify-center">
      <div className=" w-fit h-fit flex flex-col bg-white  max-w-md">
        <div className=" relative ">
          <img
            src="https://www.monash.edu/__data/assets/image/0011/4044899/QS-Rankings-2026-Banner-3-optimised.jpg"
            alt=""
            className="w-130 h-30 object-cover rounded-t-md"
          />
          <h1 className="absolute bottom-2 left-8 text-2xl tracking-widest">
            Top New Communities
          </h1>
        </div>
        <div className="flex flex-col ">
          {subreddits.map((item, index) => (
            <ListItem
              key={item.Title}
              index={index + 1}
              rankingUp={
                index + 1 < item.PreviousRank
                  ? true
                  : index + 1 === item.PreviousRank
                  ? null
                  : false
              }
              image={item.Image}
              title={item.Title}
              join={item.Join}
            />
          ))}
        </div>
        <div className="p-4 px-6 border border-t-0  border-gray-300 flex flex-col gap-4">
          <div>
            <button className="text-white font-bold text-xl bg-blue-500 p-2 rounded-2xl w-full">
              View All
            </button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Subreddits title="Top" link="https://www.reddit.com/r/all/top/" />
            <Subreddits
              title="Near You"
              link="https://www.reddit.com/r/all/top/"
            />
            <Subreddits
              title="Sports"
              link="https://www.reddit.com/r/all/top/"
            />

            <Subreddits title="Aww" link="https://www.reddit.com/r/all/top/" />
          </div>
        </div>
      </div>
    </div>
  );
}
