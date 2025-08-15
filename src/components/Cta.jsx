import React from "react";
import HireSection from "./hireMe";
import Comment from "./Comment";


const TestCta = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Let’s Work Together
        </h2>
        <p className="text-gray-600 mt-2">
          Reach out to hire me or leave a comment below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* ----------- Hire Me Form ----------- */}
        <HireSection />
        <Comment />
      </div>
    </section>
  );
};

export default TestCta;
