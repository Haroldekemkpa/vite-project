import React from "react";
import assets from "../assets/assets.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Skills = () => {
  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const skills = [
    { name: "HTML5", image: assets.html },
    { name: "CSS3", image: assets.css3 },
    { name: "Bootstrap 5", image: assets.bootstrap },
    { name: "Tailwind.css", image: assets.tailwind },
    { name: "JavaSript", image: assets.js },
    { name: "React", image: assets.reactImg },
    { name: "Node.js", image: assets.node },
    { name: "Epress", image: assets.express },
    { name: "PHP", image: assets.php },
    { name: "Laravel", image: assets.laravel },
    { name: "MongoDB", image: assets.mongodb },
    { name: "MySql", image: assets.mysql },
    { name: "Git", image: assets.git },
  ];

  return (
    <div className="px-10 md:px-40 mb-20 text-center flex flex-col items-center justify-center ">
      <h1 className="font-bold text-4xl mb-4">Skills</h1>
      <div className="w-full mb-2 lg:w-[50%]">
        <Slider {...settings}>
          {skills.map((cur) => (
            <div
              key={cur.name}
              className="w-40 lg:h-40 bg-white flex flex-col items-center justify-center p-4"
            >
              <div className="">
                <img
                  src={cur.image}
                  alt={cur.name}
                  className="lg:w-40 rounded shadow-lg"
                />
              </div>
              {/* <div>
                <p className="text-center">{cur.name}</p>
              </div> */}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Skills;
