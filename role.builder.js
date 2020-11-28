var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.store.getUsedCapacity(RESOURCE_ENERGY) == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true){
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}})
            }
        }
    }
}
