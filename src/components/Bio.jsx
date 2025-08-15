import React from "react";
import assets from "../assets/assets.js";

const Bio = () => {
  return (
    <div
      className="flex flex-col space-y-6 lg:flex-row items-start justify-center py-20 px-10 md:py-40 lg:px-40"
      id="about"
    >
      <div className="flex-1">
        <img
          src={assets.image}
          alt="harolds-img"
          className="w-full md:w-lg h-lg rounded"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-2 ">Bio</h2>
        <p className="mb-4 leading-8">
          I am a Full Stack Web Developer with two years plus of hands-on
          experience at Sulphil Tech Hub and nearly a year at Total OBAGI as a
          FullStack Developer, I have grown into an expert who doesn’t just
          write codes but solves problems, design experiences, and contributes
          to amazing and meaningful digital solutions.
        </p>
        <p className="mb-4 leading-8">
          My journey in tech began with a simple fascination for code, but it
          quickly expanded into system architecture, product thinking, and a
          drive for continuous growth. I work primarily with{" "}
          <strong>
            {" "}
            HTML5, CSS, Bootstrap.css, Tailwind CSS, JavaScript, React.js,
            Node.js, Express.js, PHP, Laravel,{" "}
          </strong>{" "}
          while also handling backend operations using{" "}
          <strong> MongoDB or mySql database and RESTful APIs.</strong> Whether
          I’m developing clean, responsive UIs or building scalable full-stack
          applications, I bring both creative energy and technical depth to the
          table.
        </p>
        <p className="leading-8">
          <span className="block font-bold">🔍 What motivates me? </span>
          Creating tech that makes a difference. Writing elegant, maintainable
          code. And growing as a developer, a teammate, and a lifelong learner.
        </p>
        <p className="leading-8">
          <span className="block font-bold">🌍 What’s ahead? </span>
          I’m looking for opportunities where I can stretch my skills,
          contribute meaningfully, and work alongside teams that care deeply
          about what they build.
        </p>
        <div className="my-8 flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4 ">
          <a
            href="https://www.linkedin.com/in/harold-ekemkpa/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10b981] px-4 py-3 text-center text-white uppercase rounded shadow-md"
          >
            connect with me{" "}
          </a>
          <a
            href="#hire"
            rel="noopener noreferrer"
            className="text-white bg-[#f97316] px-4 py-3 text-center text-white uppercase rounded shadow-md "
          >
            hire me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bio;
