/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('build');
 * mod.thing == 'a thing'; // true
 */
var build = {
run: function(creep) {
    var spawn1 =  Game.spawns['Spawn1']

        var buildPath = spawn1.room.findPath(creep.pos, Game.flags.targetConstructionSite); //define constant buildPath and the path between the creeps current position (by the source) to the spawn
        creep.memory.bPath = buildPath; //write constant buildPath to the creep's memory to save cpu
        if (creep.build(targetConstructionSiteGetObjectById) == ERR_NOT_IN_RANGE) { //If you try to transfer and you get the message that it's too far away then
            creep.moveByPath(creep.memory.bPath) //Move from the path defined in your memory moments ago to the structure you're trying to transfer too
            creep.say('🛠️') //Say an emoji displaying your status
        }
    }
}

module.exports = roleBuild;
