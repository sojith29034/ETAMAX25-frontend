import myImage from "../assets/finalimage.png"; // Import your image

const About = () => {
  return (
    <div className="bg-[#FEF1E4] text-white">
      {/* Spectrum Section */}
      <div className="flex flex-col md:flex-row items-center justify-around py-10 md:py-24 px-6">
        <div className="flex flex-col mt-6 md:mt-0 ">
          <div>
            <img
              className="w-full md:max-w-sm"
              src={myImage}
              alt="My Local Image"
            />
          </div>
          <div className=" bg-[#E9A107] flex justify-center self-center text-white px-4 py-2 text-center">
            SPECTRUM{" "}
          </div>
        </div>
        <div className="md:w-2/5 text-justify mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4 text-black text-center">
            SPECTRUM
          </h2>
          <p className="leading-relaxed text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ultricies libero ex, non porttitor est auctor vitae. Proin
            vestibulum malesuada urna ut euismod. Donec eget ullamcorper sapien,
            id posuere neque. Ut leo augue, semper sit amet gravida ac,
            hendrerit facilisis mauris. Sed tincidunt sed lectus sed rutrum.
          </p>
        </div>
      </div>
      {/* </div> */}

      {/* Frame */}
      <div className="h-[73px] bg-[#F2DAB8] w-full"></div>

      {/* Etamax Section */}
      <div className="flex flex-col md:flex-row items-center justify-around py-10 md:py-24 px-6">
        <div className="flex flex-col mt-6 md:mt-0 ">
          <div>
            <img
              className="w-full md:max-w-sm"
              src={myImage}
              alt="My Local Image"
            />
          </div>
          <div className=" bg-[#E9A107] flex justify-center self-center text-white px-4 py-2 text-center">
            ETAMAX{" "}
          </div>
        </div>
        <div className="md:w-2/5 text-justify mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4 text-black text-center">
            ETAMAX
          </h2>
          <p className="leading-relaxed text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ultricies libero ex, non porttitor est auctor vitae. Proin
            vestibulum malesuada urna ut euismod. Donec eget ullamcorper sapien,
            id posuere neque. Ut leo augue, semper sit amet gravida ac,
            hendrerit facilisis mauris. Sed tincidunt sed lectus sed rutrum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
