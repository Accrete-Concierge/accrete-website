"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import {
  faPhone,
  faEnvelope,
  // indicator for dropdown
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Logo from "@/public/logoFinal.png";
import { useState, useEffect, useTransition, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";

type SocialMediaIconType = {
  icon: FontAwesomeIconProps["icon"];
  id: string;
};

const socialMediaIcons: SocialMediaIconType[] = [
  { icon: faFacebookF, id: "facebook" },
  { icon: faTwitter, id: "twitter" },
  { icon: faGlobe, id: "globe" },
  { icon: faInstagram, id: "instagram" },
];

type SocialMediaIconProps = {
  icon: FontAwesomeIconProps["icon"];
};

const SocialMediaIcon = ({ icon }: SocialMediaIconProps) => (
  <div className="bg-gray-500 rounded-full flex items-center justify-center h-6 w-6 cursor-pointer">
    <FontAwesomeIcon icon={icon} className="text-white w-3" />
  </div>
);

const NavBar = () => {
  const isClient = typeof window !== "undefined";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null); // Window width state
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  const router = useRouter();

  const pathname = usePathname();

  const navItems = [
    { name: "HOME", route: "/home" },
    { name: "ABOUT", route: "/about" },
    { name: "SERVICES", route: "/services" },
    { name: "RESOURCES", route: "", isDropdown: true },
    { name: "CONTACT", route: "/contact" },
  ];

  const resourcesItems = [
    { name: "BLOGS", route: "/resources/blog" },
    {
      name: "Medical Billing and Case Studies",
      route: "/resources/caseStudy",
    },
  ];
  useEffect(() => {
    setIsMounted(true); // Component has mounted
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isClient) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 768 && isMenuOpen) {
          setIsMenuOpen(false);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isClient) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownClick = () => {
    setIsResourcesOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current); // Clear any previous closing timeout
    }
    setIsResourcesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 100);
  };

  const navigate = (route: string) => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
    router.push(route);
  };

  if (!isMounted) {
    return null; // Prevent SSR rendering
  }

  return (
    <>
      {/* ------header------------ */}
      <div className="flex md:flex-row flex-col gap-6 p-2 2xl:px-52 px-10 md:px-28 bg-[#91cbdd]">
        <div className="flex md:flex-row flex-col md:gap-5 gap-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="text-white w-4" icon={faPhone} />
            <a href="tel:+14708024555" className="font-medium text-sm">
              +1-470-802-4555
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="text-white w-4" icon={faEnvelope} />
            <a
              href="mailto:ChristinaL@accreteconcierge.net"
              className="font-medium text-sm"
            >
              ChristinaL@accreteconcierge.net
            </a>
          </div>
        </div>
        <div className="flex gap-2 justify-start items-start md:justify-end md:items-end md:ml-auto">
          {socialMediaIcons.map(({ icon, id }) => (
            <SocialMediaIcon key={id} icon={icon} />
          ))}
          <div className="bg-gray-500 rounded-full flex items-center justify-center h-6 w-6 cursor-pointer">
            <a
              className=" flex justify-center items-center"
              href="https://www.linkedin.com/company/accrete-concierge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-white text-center w-3"
              />
            </a>
          </div>
        </div>
      </div>

      {/* -------navBar----------- */}
      <div
        className={`z-10 relative flex gap-16 md:gap-0 2xl:px-52 px-10 md:px-28 py-4 w-full items-center transition-colors duration-300 ${
          isScrolled ? "bg-blue-200 fixed top-0 left-0" : "bg-transparent"
        }`}
      >
        <Image
          src={Logo.src}
          alt="Logo"
          width={224}
          height={224}
          className="w-40 md:w-56"
        />
        <div className="md:hidden z-50 ml-auto">
          {isMenuOpen ? (
            <HiX
              className="w-8 h-8 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <HiMenu
              className="w-8 h-8 cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        <ul
          className={`flex md:flex-row flex-col md:gap-8 gap-3 justify-start items-start md:justify-end md:items-end md:ml-auto pl-8 absolute md:static top-[60px] left-0 h-screen md:h-auto w-full md:w-auto bg-blue-200 md:bg-transparent py-4 md:py-0 md:z-auto transition-all duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {navItems.map(({ name, route, isDropdown }, index) => (
            <li
              key={index}
              className={`cursor-pointer font-medium px-2 py-1 border-b-2 border-transparent relative ${
                pathname === route
                  ? "text-[#6BD4F4] border-[#6BD4F4]"
                  : "text-gray-600"
              } hover:text-[#6BD4F4] hover:border-[#6BD4F4] 
              `}
              onMouseEnter={
                isDropdown && window.innerWidth >= 768
                  ? handleMouseEnter
                  : undefined
              }
              onMouseLeave={
                isDropdown && window.innerWidth >= 768
                  ? handleMouseLeave
                  : undefined
              }
              onClick={() => (route ? navigate(route) : handleDropdownClick())}
            >
              <div
                role="button"
                aria-expanded={isResourcesOpen}
                className="flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isDropdown && windowWidth !== null && windowWidth < 768) {
                    handleDropdownClick(); // Toggle dropdown for mobile
                  } else if (route) {
                    setIsMenuOpen(false);
                    startTransition(() => {
                      router.push(route); // Navigate on click
                    });
                  }
                }}
                onMouseEnter={() => {
                  if (
                    isDropdown &&
                    windowWidth !== null &&
                    windowWidth >= 768
                  ) {
                    setIsResourcesOpen(true); // Open dropdown for desktop
                  }
                }}
                // onMouseLeave={() => {
                //   if (isDropdown && window.innerWidth >= 768) {
                //     setIsResourcesOpen(false); // Close dropdown for desktop
                //   }
                // }}
              >
                {name}
                {isDropdown && (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 text-sm"
                  />
                )}
              </div>
              {isDropdown && isResourcesOpen && (
                <ul
                  className="absolute top-full left-0 w-60 md:w-72 mt-2 bg-blue-200 shadow-lg rounded-md z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} // close dropdown only when leaving the dropdown instead of item
                >
                  {resourcesItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-blue-300 text-gray-800 cursor-pointer"
                      onClick={() => navigate(item.route)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div>
          {isPending && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <CircularProgress size={32} color="primary" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
