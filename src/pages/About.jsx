const About = () => {
  return (
    <div className="flex flex-col p-6 space-y-6">
      {/* Content Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">About Spectrum</h1>
        <p className="text-lg text-gray-700">
          Spectrum - Where Ideas Refract. Join us for an exciting journey
          through the world of creativity, technology, and innovation.
        </p>
      </div>

      {/* Images and Content Section */}
      <div className="small-screen flex flex-col sm:flex-row justify-center gap-8">
        {/* First Image with Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:w-[600px]">
          <div className="relative w-full sm:w-[50%]">
            <img
              src="./SPECTRUM.png"
              alt="Spectrum Image 1"
              className="w-full h-auto"
            />
          </div>
          <div className="sm:w-[50%] text-center sm:text-left mb-10">
            <p className="text-md text-gray-600">
              This is a brief description for the first image. It explains the
              context and significance of the image.
            </p>
          </div>
        </div>

        {/* Second Image with Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:w-[600px]">
          <div className="relative w-full sm:w-[50%]">
            <img
              src="./SPECTRUM.png"
              alt="Spectrum Image 2"
              className="w-full h-auto"
            />
          </div>
          <div className="sm:w-[50%] text-center sm:text-left">
            <p className="text-md text-gray-600">
              This is a brief description for the second image. It highlights
              the key features or concepts behind the image.
            </p>
          </div>
        </div>
      </div>

      {/* Images and Content Section */}
      <div className="wide-screen flex justify-center gap-8">
        {/* First Image with Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:w-[600px]">
          <div className="relative w-full sm:w-[50%]">
            <img
              src="./SPECTRUM.png"
              alt="Spectrum Image 1"
              className="w-full h-auto"
            />
          </div>
          <div className="sm:w-[50%] text-center sm:text-left">
            <p className="text-md text-gray-600">
              This is a brief description for the first image. It explains the
              context and significance of the image.
            </p>
          </div>
        </div>

        {/* Second Image with Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:w-[600px]">
          <div className="relative w-full sm:w-[50%]">
            <img
              src="./SPECTRUM.png"
              alt="Spectrum Image 2"
              className="w-full h-auto"
            />
          </div>
          <div className="sm:w-[50%] text-center sm:text-left">
            <p className="text-md text-gray-600">
              This is a brief description for the second image. It highlights
              the key features or concepts behind the image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;