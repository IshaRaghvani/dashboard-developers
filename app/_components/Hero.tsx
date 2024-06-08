import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-900 ml-50 flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center lg:justify-center">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Developer's Dashboard
            <strong className="font-bold text-primary sm:block">
              {" "}
              In Seconds Not Hours!{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl text-gray-500">
            Streamline your development process with our powerful tools and integrations. Save time and boost productivity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-dark focus:outline-none focus:ring active:bg-primary-darker sm:w-auto"
              href="/overview"
            >
              Get Started
            </a>

            
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
