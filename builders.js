//Why reinvent the wheel right? This script is derived off of the harvester script

var roleBuild = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        //general stuff
        var buildRun = require('build'); //Import "build" document to be ran when no more space

        var freeCap = creep.store.getFreeCapacity(RESOURCE_ENERGY); //Free capacity of the creep
        var usedCap = creep.store.getFreeCapacity(RESOURCE_ENERGY);
        var totalCap = creep.store.getCapacity; //Total capacity of the creep
        var spawn1 =  Game.spawns['Spawn1']

        //mines
        var mineObject = Game.getObjectById(creep.memory.mine2);

        //construction sites
        var constructionSites = spawn1.room.find(FIND_MY_CONSTRUCTION_SITES);
        if(constructionSites.length != 0) {
            var targetConstructionSite = constructionSites[0].id;
            var targetConstructionSiteGetObjectById = Game.getObjectById(targetConstructionSite);
        }

        console.log('creep name: '+creep.memory.creepName+', Free cap: '+freeCap) //Log the creeps and how much free space they have
        
        //If there is no space 
        if(freeCap == 0){ 
            buildRun.run(creep);
        }
        //    var buildPath = spawn1.room.findPath(creep.pos, Game.flags.targetConstructionSite); //define constant buildPath and the path between the creeps current position (by the source) to the spawn
        //    creep.memory.bPath = buildPath; //write constant buildPath to the creep's memory to save cpu
        //    if (creep.build(targetConstructionSiteGetObjectById) == ERR_NOT_IN_RANGE) { //If you try to transfer and you get the message that it's too far away then
        //        creep.moveByPath(creep.memory.bPath) //Move from the path defined in your memory moments ago to the structure you're trying to transfer too
        //        creep.say('🛠️') //Say an emoji displaying your status
        //    }
        //}

        //If there is space
        if(freeCap = 1-50){ 
            var harvestToBuildPath = creep.room.findPath(creep.pos, Game.flags.s2) //Same as above, find and define the path between your current position (hypothetically by the spawn) to the s1 flag (Which lies at a source)
            creep.memory.hbPath = harvestToBuildPath; //write constant harvestPath to memory to be called on later
            if(creep.harvest(mineObject) == ERR_NOT_IN_RANGE) { //if you try to harvest mine1 (defined when spawning creep as the first source) and it's out of range
                creep.moveByPath(creep.memory.hbPath) //then move by path defined above to it
                creep.say('⛏️') //and use an emoji to display your status
            }
        }
    }
};

module.exports = roleBuild;
