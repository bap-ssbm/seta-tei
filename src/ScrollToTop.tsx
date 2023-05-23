import React, { FC, useEffect } from 'react'
import { useLocation } from "react-router-dom";
interface ScrollToTopProps {
  children?: React.ReactNode
}

const ScrollToTop: FC<ScrollToTopProps> = ({children}) => {
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop