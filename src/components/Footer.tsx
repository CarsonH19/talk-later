import React from "react";
import Link from "next/link";
import Image from "next/image";

const socialMedia = [
  {
    id: 1,
    link: "https://github.com/CarsonH19",
    img: "/git.svg",
  },
  {
    id: 2,
    link: "www.linkedin.com/in/carson-harp-96a678155",
    img: "/link.svg",
  },
];

const Footer = () => {
  return (
    // <div className="absolute bottom-0 w-full">
      <footer className="py-2 flex flex-col justify-center items-center w-full border-t">
        <p className="md:text-base text-sm md:font-normal">
          Copyright © 2024 Carson Harp
        </p>

        <div className="flex items-center justify-center md:gap-3 gap-6 mt-2">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-blur-lg saturate-180 bg-opacity-75 text-black bg-blue-500 rounded-lg border border-black-300"
            >
              <Link href={profile.link}>
                <Image
                  src={profile.img}
                  alt="Social Media Icon"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          ))}
        </div>
      </footer>
    // {/* </div> */}
  );
};

export default Footer;
