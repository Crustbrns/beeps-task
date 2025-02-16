function Blur() {
  //to blur everything at the background as example shows
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-xs z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-900 opacity-80 z-10"></div>
    </>
  );
}

export default Blur;
