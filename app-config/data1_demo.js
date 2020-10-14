A.app({
  migrations: function (Migrations) { return [
    {
      name: "demo_leads",
      operation: Migrations.insert("Company", [
        {id: "1", name: "Neris IT", address: "Greenside",
          zip_code: "06", city: "Sophia Antipolis", telephone: "06 48 10 13 80"},
      ])
    },
    {
      name: "demo_contacts",
      operation: Migrations.insert("Contact", [
        {id: "1", title: { id: "1"},
          name: "Van", surname: "Truong", company: {id: "1"},
          phone: "+33 6 48 10 13 8"}
      ])
    }
  ]}
});
