const pages = [
  {
    name: "BOOKKEEP",
    route: "/bookkeep",
    icon: "bookkeep-icon",
    child: [
      { name: "Daily Consumption", route: "/bookkeep/daily" },
      { name: "Cash on Hand", route: "/bookkeep/cash" },
    ],
  },
  { name: "RAMEN MAP", route: "/ramenmap", icon: "ramen-icon" },
  { name: "FITNESS", route: "/fitness", icon: "fitness-icon" },
];

export { pages };
