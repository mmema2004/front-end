import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../css/Menu.css";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const LayOut = () => {
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

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
  const { user } = useUser();

  return (
    <div style={{}}>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, backgroundColor: "#F4F5F7" }}>
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
              paddingTop: "16px",
              paddingLeft: "24px",
              paddingRight: "32px",
            }}
          >
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default LayOut;
