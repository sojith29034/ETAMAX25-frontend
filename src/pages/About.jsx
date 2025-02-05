const About = () => {
  return (
    <div className="flex flex-col p-6 space-y-6">
      {/* Content Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Spectrum - Where Ideas Refract.
        </h1>
        <p className="text-lg text-gray-700">
          Join us for an exciting journey through the world of creativity,
          technology, and innovation.
        </p>
      </div>

      {/* Images and Content Section */}
      <div className="flex flex-col mx-0 md:mx-20 justify-center gap-8">
        {/* First Image with Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="relative w-full sm:w-[50%]">
            <img
              src="./SPECTRUM.png"
              alt="Spectrum Image 1"
              className="w-full h-auto"
            />
          </div>
          <div className="sm:w-[50%] text-center sm:text-left mb-10">
            <p className="text-md text-gray-600 text-justify">
              This year&apos;s theme of Spectrum – where ideas refract – draws
              inspiration from the splitting of a singular stream of light,
              symbolizing the endless potential that arises when ideas are
              shared, refined, and allowed to evolve. The event celebrates how
              collaboration can transform thoughts into something vibrant,
              impactful, and full of possibility. Spectrum invites us on a
              journey where creativity and innovation are fueled by diverse
              perspectives, pushing the boundaries of what we can imagine and
              achieve. It’s a call to explore the vast potential that lies in
              uniting varied insights, empowering us to turn challenges into
              limitless opportunities for growth and transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;