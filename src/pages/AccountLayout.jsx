import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import styled from "styled-components";

const CustomTabMenu = styled(TabMenu)`
  background-color: transparent;
  font-family: "Poppins";

  .p-tabmenu-nav {
    gap: 30px;
  }
  .p-menuitem-link {
    background-color: transparent;
  }
  .p-tabmenuitem.p-highlight .p-menuitem-link {
    border-bottom: 2px solid rgb(21, 21, 21);
  }
`;

function AccountLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  const items = [
    {
      label: "Profile",
      slug: "profile",
      icon: "pi pi-user",
      command: () => navigate("profile"),
    },
    {
      label: "Account Settings",
      slug: "settings",
      icon: "pi pi-cog",
      command: () => navigate("settings"),
    },
    {
      label: "Ratings",
      slug: "ratings",
      icon: "pi pi-star-fill",
      command: () => navigate("ratings"),
    },
    {
      label: "Saved Jobs",
      slug: "saved-jobs",
      icon: "pi pi-save",
      command: () => navigate("saved-jobs"),
    },
  ];

  useEffect(() => {
    const index = items.findIndex((item) =>
      location.pathname.includes(item.slug),
    );
    setActiveIndex(index);
  }, [location.pathname, items]);

  useEffect(() => {
    // Trigger an update when activeIndex changes
    setForceUpdate((prev) => !prev);
  }, [activeIndex]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-20">
      <h1 className="text-3xl font-extrabold">Hey, Jack</h1>
      <div className="overflow-x-auto">
        <CustomTabMenu
          activeIndex={activeIndex}
          model={items}
          className="my-8 py-3"
          onTabChange={(e) => setActiveIndex(e.index)}
          key={forceUpdate ? "forceUpdate" : "normal"}
        />
      </div>
      <Outlet />
    </main>
  );
}

export default AccountLayout;
