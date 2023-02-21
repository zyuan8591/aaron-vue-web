const pages = [
  {
    name: "BOOKKEEP",
    route: "/bookkeep",
    icon: "bookkeep-icon",
    child: [
      { name: "Assets", route: "/bookkeep/assets" },
      { name: "Daily Consumption", route: "/bookkeep/daily" },
    ],
  },
  { name: "RAMEN MAP", route: "/ramenmap", icon: "ramen-icon" },
  { name: "FITNESS", route: "/fitness", icon: "fitness-icon" },
  { name: "TEST", route: "/test" },
];

export { pages };
