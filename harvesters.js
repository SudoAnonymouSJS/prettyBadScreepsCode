var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        var freeCap = creep.store.getFreeCapacity(RESOURCE_ENERGY); //Free capacity of the creep
        //var totalCap = creep.store.getCapacity; //Total capacity of the creep
        //var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES); //Sources in the room and where they are
        var roomSpawn =  Game.spawns['Spawn1'] //Gross workaround by defining the spawn by name rather than having it defined as a constant and then written to memory
        var mineObject = Game.getObjectById(creep.memory.mine1);

        console.log('creep name: '+creep.memory.creepName+', Free cap: '+freeCap) //Log the creeps and how much free space they have
        
        if(freeCap == 0){ //Right buckle up for this one lads because it's gonna be a long one
            var transferPath = creep.room.findPath(creep.pos, Game.flags.targetConstructionSite); //define constant transferPath and the path between the creeps current position (by the source) to the spawn
            creep.memory.tPath = transferPath; //write constant transferPath to the creep's memory to save cpu
            if(creep.transfer(roomSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //If you try to transfer and you get the message that it's too far away then
                creep.moveByPath(creep.memory.tPath) //Move from the path defined in your memory moments ago to the structure you're trying to transfer too
                creep.say('💰') //Say an emoji displaying your status
            }
        }


        if(freeCap != 0){
            const harvestPath = creep.room.findPath(creep.pos, Game.spawns['spawn1']) //Same as above, find and define the path between your current position (hypothetically by the spawn) to the s1 flag (Which lies at a source)
            creep.memory.hPath = harvestPath; //write constant harvestPath to memory to be called on later
            if(creep.harvest(mineObject) == ERR_NOT_IN_RANGE) { //if you try to harvest mine1 (defined when spawning creep as the first source) and it's out of range
                creep.moveByPath(creep.memory.hPath) //then move by path defined above to it
                creep.say('⛏️') //and use an emoji to display your status
            }
        }
    }
};

module.exports = roleHarvester;
