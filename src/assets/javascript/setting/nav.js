const pages = [
  {
    name: "BOOKKEEP",
    route: "/bookkeep",
    icon: "bookkeep-icon",
    child: [
      { name: "Cash on Hand", route: "/bookkeep/cash" },
      { name: "Daily Consumption", route: "/bookkeep/daily" },
    ],
  },
  { name: "RAMEN MAP", route: "/ramenmap", icon: "ramen-icon" },
  { name: "FITNESS", route: "/fitness", icon: "fitness-icon" },
];

export { pages };
