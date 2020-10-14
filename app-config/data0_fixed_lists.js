A.app({
  migrations: function (Migrations) { return [
    {
      name: "statuses",
      operation: Migrations.insert("TaskStatus", [
        {id: "1", name: "En cours", order: 1},
        {id: "2", name: "Terminé", order: 2},
      ])
    },
    {
      name: "taskTypes",
      operation: Migrations.insert("TaskType", [
        {id: "1", name: "Relance", order: 1},
        {id: "2", name: "Etude", order: 2},
        {id: "3", name: "Rdv ou Visite", order: 3},
      ])
    },
    {
      name: "historyTypes",
      operation: Migrations.insert("HistoryType", [
        {id: "1", name: "Appel", order: 1},
        {id: "2", name: "Prospection Physique", order: 2},
        {id: "3", name: "Rdv", order: 3},
        {id: "999", name: "Autre", order: 999},
      ])
    },
    {
      name: "equipment-types",
      operation: Migrations.insert("EquipmentType",[
        { id : "1", name: "MFP A3 Couleur", order: 1 },
        { id : "2", name: "MFP A3 NB" , order: 2},
        { id : "3", name: "MFP A4 Couleur", order: 3 },
        { id : "4", name: "MFP A4 NB", order: 4 },
        { id : "5", name: "Imprimante", order: 5 },
        { id : "6", name: "Grand Format", order: 6 },
        { id : "7", name: "Informatique", order: 7 },
        { id : "8", name: "Logiciel", order: 8 },
        { id : "999", name: "Autre", order: 999 }
      ])
    },
    {
      name: "brands",
      operation: Migrations.insert("Brand",[
        { id : "1", name: "Canon", order: 1 },
        { id : "2", name: "Ricoh" , order: 2},
        { id : "3", name: "Konica/Minolta" , order: 3},
        { id : "4", name: "Kyocera" , order: 4},
        { id : "5", name: "Xerox" , order: 5},
        { id : "6", name: "Sharp" , order: 6},
        { id : "7", name: "Toshiba" , order: 7},
        { id : "8", name: "Samsung" , order: 8},
        { id : "9", name: "HP" , order: 9},
        { id : "10", name: "Triumph Adler" , order: 10},
        { id : "11", name: "Oki" , order: 11},
        { id : "12", name: "Sagem" , order: 12},
        { id : "13", name: "Develop" , order: 13},
        { id : "14", name: "Lexmark" , order: 14},
        { id : "15", name: "Panasonic" , order: 15},
        { id : "16", name: "NRG" , order: 16},
        { id : "17", name: "Epson" , order: 17},
        { id : "18", name: "Dell" , order: 18},
        { id : "999", name: "Autre" , order: 999}
      ])
    },
    {
      name: "contract-types",
      operation: Migrations.insert("ContractType",[
        { id : "1", name: "Location" },
        { id : "2", name: "Achat" }
      ])
    },
    {
      name: "titles",
      operation: Migrations.insert("Title",[
        { id: "1", name: "Monsieur"},
        { id: "2", name: "Madame"}
      ])
    }
  ]}
});
