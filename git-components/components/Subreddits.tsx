type prop = {
  title: string;
  link: string;
};

export default function Subreddits({ title, link }: prop) {
  return (
    <div className="bg-gray-100 p-2 w-fit rounded-2xl">
      <a className="text-blue-500 font-bold" href={link}>
        {title}
      </a>
    </div>
  );
}
