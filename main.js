
module.exports.loop = function () {
    //Harvester stuff
    var harvesterId = _.filter(Game.creeps, (creep) => creep.memory.role == 'drone'); //Id creep as harvester
    var harvesterRun = require('harvesters'); //Import "harvesters" document to be ran by creeps with "drone" identifier later
    //builder stuff
    var builderId = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'); //Id creep as builder
    var builderRun = require('builders'); //Import "builders" document to be ran by creeps with "drone" identifier later

    //general stuff
    var controllerLevel = StructureController.level;
    var newName = Game.time;
    var spawn1 =  Game.spawns['Spawn1']

    //Find sources from spawn, to be written into the memory of creeps later
    var sources = spawn1.room.find(FIND_SOURCES);
    const source1 = sources[0].id; // Create two variables from the list "sources" defined above
    const source2 = sources[1].id; //"Cannot read property 'id' of undefined"?
    
    //Find construction sites
    var constructionSites = spawn1.room.find(FIND_MY_CONSTRUCTION_SITES);

    //create flags at sources to be used for pathfinding
    spawn1.room.createFlag(sources[0].pos, 's1');
    spawn1.room.createFlag(sources[1].pos, 's2');

    //create flag at spawn to be used for pathfinding
    spawn1.room.createFlag(spawn1.pos, 'sp1');
    
    //create flag at any construction site
    spawn1.room.createFlag(constructionSites[1], 'targetConstructionSite');

    //Spawns
    if(constructionSites.length > 0) {
        if(builderId.length < 2) {
            spawn1.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder', mine1: source1, mine2: source2, creepName: newName}}); //Create a creep if there arent enough. role "drone" with two sources defined as "mines" written to memory        
        }
    }   
    if(harvesterId.length < 2) {
        spawn1.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'drone', mine1: source1, mine2: source2, creepName: newName}}); //Create a creep if there arent enough. role "drone" with two sources defined as "mines" written to memory        
    };

    //Depending on memory, run specific files on each screep
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'drone') {
            harvesterRun.run(creep);
        }
        if(creep.memory.role == 'builder') {
            builderRun.run(creep);
        }
    }
}