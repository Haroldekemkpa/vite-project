import React, { useContext } from "react";
import { createContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CommentContextAPI } from "../context/ContextApi";
import assets from "../assets/assets";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const TestimonialCarousel = () => {
  const { comments } = useContext(CommentContextAPI);
  return (
    <section className="bg-gray-100 py-16 px-4 md:px-20" id="testimonial">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          What Clients Say
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Real feedback from real collaborators.
        </p>
      </div>

      <Slider {...settings}>
        {comments.length > 0 &&
          comments.map((cur, index) => (
            <div key={index} className="px-4 h-full">
              <div className="bg-white h-full min-h-[320px] flex flex-col justify-between shadow-lg p-6 rounded-2xl text-center">
                <div>
                  <img
                    src={
                      cur.profile_img
                        ? `http://localhost:3000/uploads/${cur.profile_img}`
                        : `${assets.img}`
                    }
                    alt={cur.name}
                    className="w-20 h-20 mx-auto rounded-full border-4 border-orange-400 object-cover mb-4"
                  />
                  <p className="text-gray-700 text-sm italic mb-4">
                    "{cur.comment}"
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cur.name}
                  </h3>
                  <p className="text-sm text-orange-500">{cur.title}</p>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </section>
  );
};

export default TestimonialCarousel;
