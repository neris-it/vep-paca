module.exports = function (Crud) {
    return{
      setEntityResponsibleManager: function(Entity, entityResponsibleUser){
        /* Entity must contain field {responsible_manager}*/
        if(entityResponsibleUser) {
            //normally entityResponsibleUser will contain only {id, name}
            //so we have to read its {manager} from DB

            var userCrud = Crud.crudForEntityType("User");
            return userCrud.readEntity(entityResponsibleUser.id).then(function(entityResponsible){
              if(entityResponsible.manager){
                Entity.responsible_manager = entityResponsible.manager;
              } else {
                Entity.responsible_manager = null;
              }
            });
        } else {
          Entity.responsible_manager = null;
        }
      }
    }
};
