module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.store.getUsedCapacity(RESOURCE_ENERGY) == creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true){
            if (Game.spawns.Spawn1.store.getUsedCapacity(RESOURCE_ENERGY) < 300) {
                if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
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
