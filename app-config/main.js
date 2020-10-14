A.app({
  appName: function (Config) {
    return  Config.name ||  'Neris CRM'
  },
  appIcon: "rocket",
  onlyAuthenticated: true,
  allowSignUp: false,
  forceLocale: "fr",
  menuItems: [
    {
      name: "Leads",
      entityTypeId: "Company",
      icon: "building"
    },
    {
      name: "Tâches en cours",
      entityTypeId: "TasksInProcess",
      icon: "tasks"
    },
    {
      name: "Tâches tardives",
      entityTypeId: "BelatedTasks",
      icon: "clock-o"
    },
    {
      name: "Autres tâches",
      entityTypeId: "OtherTasks",
      icon: "bars"
    },
    {
      name: "Paramètres",
      icon: "cog",
      children: [
        {
          name: "Mon profil",
          entityTypeId: "Profile",
          icon: "user"
        },
        {
          name: "Mes vendeurs",
          entityTypeId: "SalesProfile",
          icon: "users"
        }
      ]
    }
  ]
});