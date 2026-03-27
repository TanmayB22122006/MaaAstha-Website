import React from "react";
import img1 from "../assets/about-1.jpg";
import img2 from "../assets/about-2.jpg";

const About = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-ngo-dark-blue dark:text-white mb-4">
            Our Identity & Purpose
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto italic">
            "Maa Astha Foundation: A journey of compassion, healing, and hope."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-12">
            {/* Mission Section */}
            <div className="relative p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-8 border-ngo-green">
              <h2 className="text-3xl font-bold text-ngo-green mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To provide a safe, dignified, and loving environment for the homeless, abandoned, and the destitute. 
                We aim to be their family when they have none, ensuring they receive the best medical, nutritional, 
                and emotional care possible.
              </p>
            </div>

            {/* Vision Section - NEWLY ADDED */}
            <div className="relative p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-8 border-ngo-blue">
              <h2 className="text-3xl font-bold text-ngo-blue mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                A world where no individual is left behind on the streets. We envision a society that is 
                sensitive to the needs of the homeless and works together to ensure every human being has 
                access to basic necessities and a chance at a better life.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 justify-center">
             <img src={img1} alt="Healthcare" className="rounded-2xl shadow-xl h-72 w-full object-cover transform hover:scale-105 transition-all" />
             <div className="bg-ngo-dark-blue text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-3 underline decoration-ngo-green">Our Core Values</h3>
                <ul className="list-disc list-inside space-y-2 opacity-90">
                  <li>Unconditional Compassion</li>
                  <li>Inclusion for All Genders & Ages</li>
                  <li>Total Transparency & Accountability</li>
                  <li>Continuous Community Engagement</li>
                </ul>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;