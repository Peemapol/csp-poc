
function createMeteor() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Single meteor */}
      <div className="meteor" />
      <div className="meteor meteor1" />
      <div className="meteor meteor2" />
    </div>
  );
}

export default function meteor() {
  return (
    <div className="w-full bg-[#040315]">
      <div className="h-screen">
        <div className="overflow-hidden rounded-md">
          <div className="">
            {createMeteor()}
          </div>
          <div className="flex h-screen items-center justify-center flex-col">
          <h1 className="md:text-7xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20 tracking-wider leading-relaxed">
            Making Digital Life <br /> Possible for All
          </h1>
          <p className="mx-[6rem] lg:text-text-base  text-center text-white relative z-20 mt-6 tracking-wide leading-relaxed">
            Collaborating with a Thai financial technology company, we are a
            joint venture between <br /> INFINITAS by Krungthai and Accenture,
            the leading global professional services
          </p>
          </div>
        
        </div>
      </div>
    </div>
  );
}
