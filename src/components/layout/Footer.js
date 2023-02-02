import React from "react";

let data = [
  {
    id: 1,
    name: ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
  },
  {
    id: 2,
    name: ["Help Center", "Jobs", "Cookie Preferences", "Legal Guarantee"],
  },
  {
    id: 3,
    name: [
      "Account",
      "Ways to Watch",
      "Corporate Information",
      "Legal Notices",
    ],
  },
  {
    id: 4,
    name: ["Media Center", "Terms of Use", "Contact Us", "Only on Netflix"],
  },
];

const Footer = () => {
  return (
    <footer>
      <div className='bg-black w-full '>
        <div className=' h-[250px] lg:h-[200px] flex items-center md:h-[120px]'>
          <div className='w-[200px] footer-left lg:w-[100px] md:w-[80px] ml-20 xl:ml-0'>
            <img
              src='https://cdn-images-1.medium.com/max/1200/1*ty4NvNrGg4ReETxqU2N3Og.png'
              alt=''
              className='w-full h-full object-cover'
            />
          </div>
          <div className='footer-right flex text-slate-400  items-center gap-x-28 ml-20  xl:gap-x-10 lg:gap-x-5 lg:ml-5 md:text-xs md:gap-x-2 md:ml-2'>
            {data.length > 0 &&
              data.map((item) => (
                <ul
                  className='flex flex-col gap-y-5 xl:gap-y-3 lg:gap-y-1'
                  key={item.id}>
                  {item.name.map((item02) => (
                    <li className='cursor-pointer' key={item02}>
                      {item02}
                    </li>
                  ))}
                </ul>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
