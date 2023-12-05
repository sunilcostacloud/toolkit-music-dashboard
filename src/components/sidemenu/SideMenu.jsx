import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const menuItems = [
  {
    name: "Home",
    exact: true,
    to: "/",
  },
  {
    name: "Admin",
    exact: true,
    to: "/admin",
  },
  {
    name: "Creator",
    exact: true,
    to: `/creator`,
  },
  {
    name: "User",
    exact: true,
    to: `/user`,
  },
];

const SideMenu = () => {
  const { token } = useSelector((state) => state.auth);

  const [roles, setRoles] = useState([]);

  // console.log("checkTokensidemenu", token)
  //   console.log("roles", roles)

  const [activeIndex, setActiveIndex] = useState(0);

  let location = useLocation();
  let pathname = location.pathname;

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRoles(decoded?.UserInfo?.roles);
    }
  }, [token]);

  useEffect(() => {
    // Find the index of the menu item with a matching "to" value
    const foundIndex = menuItems.findIndex(
      (menuItem) => menuItem.to === pathname
    );

    // Update the activeIndex if a match is found
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [pathname]);

  return (
    <>
      <div className={styles.SidebarParent}>
        {menuItems.map((menuItem, index) => (
          <div key={index} onClick={() => setActiveIndex(index)}>
            {(menuItem.name === "Home" ||
              roles?.some(
                (role) => role.toLowerCase() === menuItem.name.toLowerCase()
              )) && (
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to={menuItem.to}
              >
                <div
                  className={`${styles.SidebarItem} ${
                    index === activeIndex ? styles.active : ""
                  }`}
                >
                  <p>{menuItem.name}</p>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SideMenu;
