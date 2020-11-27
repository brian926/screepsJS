var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader')

module.exports.loop = function() {
    
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps){
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
    }

    var minimumNumberOfHarvesters = 10;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var name = 'creep' + String(Game.time).substr(-3);

    if (numberOfHarvesters < minimumNumberOfHarvesters && (Game.spawns.Spawn1.store.getUsedCapacity(RESOURCE_ENERGY) >= 300)) {
        Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'harvester', working: false } });
        console.log("Spawning new harvester creep: " + name);
    }
    else if (numberOfHarvesters > minimumNumberOfHarvesters && Game.spawns.Spawn1.store.getUsedCapacity(RESOURCE_ENERGY) >= 250){
        Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], name, { memory: { role: 'upgrader', "working": false } });
        console.log("Spawning new upgrader creep: " + name);
    }
};

