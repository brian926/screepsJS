var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')

module.exports.loop = function() {
    
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // Run roles
    for (let name in Game.creeps){
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }


    // Auto Spawn Creeps
    var minimumNumberOfHarvesters = 10;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

    var minimumNumberOfUpgraders = 1;
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    var minimumNumberOfBuilders = 1;
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    var name = 'creep' + String(Game.time).substr(-3);

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], name, { memory: { role: 'harvester', working: false } });
    }
    else if (numberOfUpgraders < minimumNumberOfUpgraders){
        Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], name, { memory: { role: 'upgrader', "working": false } });
    }
    else if (Game.spawns.Spawn1.store.getUsedCapacity(RESOURCE_ENERGY) >= 250){
        Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE, MOVE], name, { memory: { role: 'builder', "working": false } });       
    }

    /* Build roads
    var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
    for (var j = 0; j < sources.length; j++) {
        var chemin = Game.spawns.Spawn1.pos.findPathTo(sources[j].pos);
        for (var i = 0; i <chemin.length; i++) {
            Game.spawns.Spawn1.room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
        }
    }*/
};

