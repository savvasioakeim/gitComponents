import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  index: number;
  rankingUp: boolean | null;
  image: string;
  title: string;
  join: boolean;
};

export default function ListItem({
  index,
  rankingUp,
  image,
  title,
  join,
}: Props) {
  return (
    <>
      <div className="flex items-center  justify-between text-sm border border-gray-300 border-1 border-t-0  p-3 pl-7 w-full">
        <div className="flex justify-between items-center gap-3">
          <span className="text-black text-xl">{index}</span>
          <div className="w-[1.5em] h-[1.5em">
            {rankingUp === true ? (
              <IoIosArrowUp className="text-red-500 text-2xl" />
            ) : rankingUp === false ? (
              <IoIosArrowDown className="text-red-500 text-2xl" />
            ) : null}
          </div>

          <img
            src={image}
            alt="subreddit image"
            className="w-11 h-11 rounded-full"
          />
          <p className="text-black text-lg  font-bold">{`r/${title}`}</p>
        </div>
        <div>
          {join && (
            <button className="text-white text-lg bg-blue-500 p-1 rounded-3xl w-[5em]">
              Join
            </button>
          )}
        </div>
      </div>
    </>
  );
}
