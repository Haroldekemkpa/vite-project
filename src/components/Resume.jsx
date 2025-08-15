import React from "react";
import assets from "../assets/assets.js";
const Resume = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20" id="resume">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Resume</h2>
        <p className="text-gray-600 mt-2">
          My journey in tech, education, and leadership
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <h3 className="text-2xl font-semibold text-orange-500 mb-4">
            Education
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold">Full-Stack Web Developement</h4>
              <p className="text-sm text-gray-600">
                Total/OBAGI HCDT Scholarship Program
              </p>
              <p className="text-sm text-gray-500">2024 – 2025</p>
            </div>
            <div>
              <h4 className="text-lg font-bold">Responsive Web Design</h4>
              <p className="text-sm text-gray-600">FreeCode camp</p>
              {/* <p className="text-sm text-gray-500">2016 – 2021</p> */}
            </div>
            <div>
              <h4 className="text-lg font-bold">B.Sc Geology</h4>
              <p className="text-sm text-gray-600">
                University of Calabar, Nigeria
              </p>
              <p className="text-sm text-gray-500">2013 – 2017</p>
            </div>
            <div className="w-full">
              <a
                href="https://github.com/Haroldekemkpa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 w-full"
              >
                <img src={assets.gitSvg} alt="git hub logo" className="w-10" />{" "}
                View portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-2xl font-semibold text-orange-500 mb-4">
            Experience
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold">Full-Stak Web Developer</h4>
              <p className="text-sm text-gray-600">
                Speedlink Hi-Tech Solutions
              </p>
              <p className="text-sm text-gray-500">2025</p>
              <p className="text-sm text-gray-600 mt-1">
                Building responsive and scalable web interface.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold">Full-Stak Developer</h4>
              <p className="text-sm text-gray-600">Freelance / Contract</p>
              <p className="text-sm text-gray-500">2023 – Present</p>
              <p className="text-sm text-gray-600 mt-1">
                Building responsive and scalable web interfaces using MERN
                stack, and modern tools.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold">
                Web Developer – Cunic Energy
              </h4>
              <p className="text-sm text-gray-600">Contract Project</p>
              <p className="text-sm text-gray-500">2023</p>
              <p className="text-sm text-gray-600 mt-1">
                Developed the official company website including PHP newsletter
                integration and responsive UI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 my-10 text-sm text-gray-700 place-items-center text-center">
        {[
          "HTML5",
          "CSS3",
          "Tailwind CSS",
          "Bootstrap 5",
          "JavaScript",
          "React.js",
          "Node.js",
          "Express",
          "MongoDB",
          "MySQL",
          "PHP",
          "Laravel",
          "Git",
          "REST APIs",
          "WordPress",
        ].map((skill) => (
          <span
            key={skill}
            className="bg-gray-200 px-2 py-2 rounded-full w-full break-words"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Resume;
