import React, { useEffect } from "react";
import Header from "./Header";

// Event

import i18next from "i18next";
import AuthComponent from "../util/Authenticate/AuthComponent";
import IdleModalTimer from "../util/Authenticate/IdleModalTimer";
import AppRoutes from "./AppRoutes";
import SidebarComponent from "./Sidebar";

export default function MainLayout() {
  useEffect(() => {
    i18next.changeLanguage("en");
    const element = document.querySelector("body");
    element.classList.add("afterloginbody");
  }, []);

  // const [togglCollapsedValue, setTogglCollapsedValue] = useState(true);

  // const handleToggle = () => {

  //   setTogglCollapsedValue((prevValue) => !prevValue);
  // };
  const intervalId = setInterval(AuthComponent, 3000);

  // To stop the interval later
  clearInterval(intervalId);

  return (
    <div className={"app"}>
      <main className="content">
        <Header />
        <div className="contentpage">
          <SidebarComponent />
          <section className="contentpagediv">
            {" "}
            <div className="contentoverlay">
              {" "}
              <AppRoutes></AppRoutes>
            </div>
            <AuthComponent />
            <IdleModalTimer />
          </section>
        </div>
      </main>
    </div>
  );
}
