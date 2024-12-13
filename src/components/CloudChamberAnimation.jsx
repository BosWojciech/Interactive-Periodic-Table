import { useRef, useEffect } from "react";
import gsap from "gsap";

const CloudChamberAnimation = () => {
  const containerRef = useRef(null);
  
  return <div ref={containerRef} className="cloud-chamber-container"></div>;
};

export default CloudChamberAnimation;
