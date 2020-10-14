module.exports = function () {
    return {
      getFilterForCurrentUser: function(User, standardNonAdminCheck, additionalCondition){
        if(User.role_admin == true) {
          return additionalCondition || {};
        }
        else if  (User.role_manager == true) {
          var filter = { $or: [
            standardNonAdminCheck,
            {"responsible_manager.id": User.id}
          ]};
          return setAdditionalCondition(filter, additionalCondition);
        }
       else {
         return setAdditionalCondition(standardNonAdminCheck, additionalCondition);
       }
     },
     metaEntityPermissions: { read: null, write: [] }
   };

    function setAdditionalCondition(filter, additionalCondition){
        if(additionalCondition){
           return  { $and: [filter, additionalCondition]};
        }
        return filter;
     }
};
