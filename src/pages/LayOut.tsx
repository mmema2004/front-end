import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../css/Menu.css";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const LayOut = () => {
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const today = new Date().toDateString();
    setDate(today);
    setLabel(today);
  }, []);

  const onClick = () => {
    if (!user) return;

    if (label === date) {
      setLabel(user.name);
      setActive(true);
    } else {
      setLabel(date);
      setActive(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          backgroundColor: "#F4F5F7",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <section className="header-outlet">
          <section className="header-date">
            <section
              className={active ? "header-active" : "header-click"}
              onClick={onClick}
            >
              <label className="headerClick">{">"}</label>
            </section>
            <section className={active ? "label-active" : "label-not"}>
              <label className="header-label">{label}</label>
            </section>
          </section>
        </section>
        <section
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingTop: "16px",
            paddingLeft: "24px",
            paddingRight: "32px",
            paddingBottom: "34px",
          }}
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default LayOut;
