var taskInProcessFilter = function (UserRightsHelper, User) {
  return UserRightsHelper.getFilterForCurrentUser(
      User, {"assignee.id": User.id}, {"status.name": "En cours"});
};

A.app({
  entities: function(Fields) {
    return {
      User: {
        fields: function ($parentProperty) {
          $parentProperty.manager = Fields.fixedReference("Géré(e) par", "User");
          $parentProperty.email = Fields.text("Email");
          $parentProperty.firstName = Fields.text("Prénom").required();
          $parentProperty.lastName = Fields.text("Nom de famille").required();
          return $parentProperty;
        },
        permissions: {
          read: null
        },
        views: {
          Profile: {
            customView: 'profile',
            title: "Profiles",
            fields: {
              username: Fields.text("Nom d'utilisateur").readOnly(),
              manager: Fields.text("Votre gérant").readOnly(),
              firstName: Fields.text("Prénom").readOnly(),
              lastName: Fields.text("Nom de famille").readOnly(),
              email: Fields.text("Email"),
              passwordHash: Fields.password("Mot de pass")
            },
            filtering: function (User) {
              return {_id: User.id};
            },
            permissions: {
              read: null,
              write: null
            }
          },

          SalesProfile: {
            title: "Mes vendeurs",
            filtering: function (User) {
              return {"manager.id": User.id};
            },
            permissions: {
              read: ["manager"],
              write: []
            },
            showInGrid:["username", "firstName", "lastName", "email"]
          }
        }
      },
      // Lead
      Company: {
        fields:{
          name: Fields.text("Raison sociale").required(),
          address: Fields.text("Adresse").required(),
          zip_code: Fields.text("Code postal").required(),
          city: Fields.text("Ville").required(),
          telephone: Fields.text("Téléphone").required(),
          siret: Fields.text("Numéro Siret"),
          staff_size: Fields.integer("Nombre du personnel"),
          activity: Fields.text("Activité"),
          web_site: Fields.link("Site Web"),
          comment: Fields.textarea("Commentaire"),
          responsible: Fields.fixedReference("Responsable", "User"),
          responsible_manager: Fields.fixedReference("Gérante", "User").readOnly(),
          equipment: Fields.relation("Matériel", "EquipmentForCompany", "company"),
          contacts: Fields.relation("Contacts", "ContactsForCompany", "company"),
          tasks: Fields.relation("Tâches", "TasksForCompany", "company"),
          history: Fields.relation("Historique", "HistoryForCompany", "company"),
          attachments: Fields.relation("Attachements", "AttachmentsForCompany", "company")
        },
        beforeSave: function(Entity, ModelHelper, Console) {
          return ModelHelper.setEntityResponsibleManager(Entity, Entity.responsible);
        },
        permissions: {
          read: null,
          write: null
        },
        filtering: function (UserRightsHelper, User) {
          return UserRightsHelper.getFilterForCurrentUser(User, { "responsible.id": User.id });
        },
        referenceName: "name",

        views: {
          Company__Print: {
            title: "Imprimer Leads",
            fields : {
              name: Fields.text("Raison sociale"),
              address: Fields.text("Adresse"),
              zip_code: Fields.text("Code postal"),
              city: Fields.text("Ville"),
              telephone: Fields.text("Téléphone"),
              siret: Fields.text("Numéro Siret"),
              staff_size: Fields.integer("Nombre du personnel"),
              activity: Fields.text("Activité"),
              web_site: Fields.link("Site Web"),
              comment: Fields.textarea("Commentaire"),
              contacts: Fields.relation("Contacts", "ContactsToPrint", "company"),
              equipment: Fields.relation("Matériel", "EquipmentToPrint", "company"),
              history: Fields.relation("Historique", "HistoryToPrint", "company"),
              tasksInProcess: Fields.relation("Tâches en cours", "TasksInProcessToPrint", "company")
            }
          }
        }
      },
      Contact: {
        fields: {
          title: Fields.fixedReference("Titre", "Title"),
          name: Fields.text("Prénom").required(),
          surname: Fields.text("Nom").required(),
          company: Fields.fixedReference("Lead", "Company"),
          phone: Fields.text("Téléphone"),
          email: Fields.email("Email"),
          position: Fields.text("Poste"),
          comment: Fields.textarea("Commentaire")
        },

        views: {
          ContactsForCompany: {
            showInGrid:["title" ,"name", "surname", "phone", "email", "position", "comment"]
          },
          ContactsToPrint : {
            fields : {
              title: Fields.fixedReference("Titre", "Title"),
              name: Fields.text("Prénom").required(),
              surname: Fields.text("Nom").required(),
              phone: Fields.text("Téléphone"),
              email: Fields.email("Email"),
              position: Fields.text("Poste"),
              comment: Fields.textarea("Commentaire"),
              company: Fields.fixedReference("Lead", "Company__Print"),
            }
          }
        }
      },
      Title : {
          fields: {
            name: Fields.text()
          },
          referenceName: "name",
          permissions: function(UserRightsHelper){
            return UserRightsHelper.metaEntityPermissions;
          }
      },

      EquipmentType : {
        fields:{
          name: Fields.text(),
          order: Fields.integer()
        },
        sorting: [['order', 1]],
        referenceName: "name",
        permissions: function(UserRightsHelper){
          return UserRightsHelper.metaEntityPermissions;
        }
      },

      ContractType : {
        fields:{
          name: Fields.text()
        },
        referenceName: "name",
        permissions: function(UserRightsHelper){
          return UserRightsHelper.metaEntityPermissions;
        }
      },
      Equipment: {
        fields: {
          type: Fields.fixedReference("Type", "EquipmentType").required(),
          brand: Fields.fixedReference("Marque", "Brand").required(),
          version: Fields.text("Version"),
          provider: Fields.text("Fournisseur"),
          contract: Fields.fixedReference("Contrat", "ContractType").required(),
          installedOn: Fields.date("Installé"),
          leasingEnd: Fields.date("Fin de location"),
          comment: Fields.textarea("Commentaire"),
          company: Fields.fixedReference("Lead", "Company")
        },
        views: {
          EquipmentForCompany: {
            showInGrid: ["type", "brand", "version", "provider", "contract",
            "installedOn", "leasingEnd", "comment"]
          },
          EquipmentToPrint: {
            fields: {
              type: Fields.fixedReference("Type", "EquipmentType").required(),
              brand: Fields.fixedReference("Marque", "Brand").required(),
              version: Fields.text("Version"),
              provider: Fields.text("Fournisseur"),
              contract: Fields.fixedReference("Contrat", "ContractType").required(),
              installedOn: Fields.date("Installé"),
              leasingEnd: Fields.date("Fin de location"),
              comment: Fields.textarea("Commentaire"),
              company: Fields.fixedReference("Lead", "Company__Print"),
            }
          }
        }
      },
      Attachement: {
        fields:{
          name: Fields.text("Nom"),
          file: Fields.attachment("Fichier"),
          company: Fields.fixedReference("Lead", "Company")
        },
        views:{
          AttachmentsForCompany: {
            showInGrid: ["name", "file"]
          }
        }
      },

      Task: {
        fields: {
          type: Fields.fixedReference("Type", "TaskType"),
          company: Fields.fixedReference("Raison Sociale", "Company"),
          date: Fields.date("Date"),
          description: Fields.textarea("Commentaire").required(),
          status: Fields.fixedReference("Statut", "TaskStatus"),
          assignee: Fields.fixedReference("Résponsable", "User"),
          responsible_manager: Fields.fixedReference("Gérante", "User").readOnly()
        },
        beforeSave: function(Entity, ModelHelper) {
          return ModelHelper.setEntityResponsibleManager(Entity, Entity.assignee);
        },
        views:{
          TasksInProcess: {
            showInGrid: ["type", "company", "date", "assignee", "responsible_manager", "description"],
            filtering: taskInProcessFilter
          },
          TasksInProcessToPrint : {
            fields : {
              type: Fields.fixedReference("Type", "TaskType"),
              company: Fields.fixedReference("Raison Sociale", "Company__Print"),
              date: Fields.date("Date"),
              description: Fields.textarea("Commentaire").required(),
              assignee: Fields.fixedReference("Résponsable", "User")
            },
            filtering: taskInProcessFilter
          },
           BelatedTasks : {
            showInGrid: ["type", "company", "date", "status", "assignee", "responsible_manager", "description"],
            filtering: function(){
              var currentDate = new Date();
              return { date: { $lte :  currentDate }, "status.name" : {$ne: "Terminé"} };
            }
          },
          OtherTasks:{
            showInGrid: ["type", "company", "date", "status", "assignee", "responsible_manager", "description"],
            filtering: function (UserRightsHelper, User) {
              return UserRightsHelper.getFilterForCurrentUser(
                User, {"assignee.id": User.id}, { "status.name" : {$ne: "En cours"} });
            }
          },
          TasksForCompany: {
            showInGrid: ["type", "date", "status", "assignee", "description"]
          }
        }
      },
      History: {
        fields: {
          type: Fields.fixedReference("Type", "HistoryType"),
          date: Fields.date("Date"),
          description: Fields.textarea("Description").required(),
          assignee: Fields.fixedReference("Résponsable", "User"),
          company: Fields.fixedReference("Lead", "Company")
        },
        views:{
          HistoryForCompany: {
            showInGrid: ["type", "date", "description"]
          },
          HistoryToPrint: {
            fields: {
              type: Fields.fixedReference("Type", "HistoryType"),
              date: Fields.date("Date"),
              description: Fields.textarea("Description").required(),
              assignee: Fields.fixedReference("Résponsable", "User"),
              company: Fields.fixedReference("Lead", "Company__Print"),
            }
          }
        }
      },
      TaskStatus: {
        fields: {
          name: Fields.text("Name").required(),
          order: Fields.integer("Order").required()
        },
        sorting: [['order', 1]],
        referenceName: "name",
        permissions: function(UserRightsHelper){
          return UserRightsHelper.metaEntityPermissions;
        }
      },
      TaskType: {
        fields: {
          name: Fields.text("Name").required(),
          order: Fields.integer("Order").required()
        },
        sorting: [['order', 1]],
        referenceName: "name",
        permissions: function(UserRightsHelper){
          return UserRightsHelper.metaEntityPermissions;
        }
      },
      HistoryType: {
        fields: {
          name: Fields.text("Name").required(),
          order: Fields.integer("Order").required()
        },
        sorting: [['order', 1]],
        referenceName: "name",
        permissions: function(UserRightsHelper){
          return UserRightsHelper.metaEntityPermissions;
        }
      },
      Brand: {
        fields: {
          name: Fields.text("Name").required(),
          order: Fields.integer("Order").required()
        },
        sorting: [['order', 1]],
        referenceName: "name",
        permissions: function(UserRightsHelper){
          return UserRightsHelper.metaEntityPermissions;
        }
      }
    }
  }
});
