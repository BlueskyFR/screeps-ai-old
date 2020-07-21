import { ErrorMapper } from "utils/ErrorMapper";

import _ from "lodash";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");

  if (harvesters.length < 2) {
    const newName = `Harvester ${Game.time}`;
    console.log("Spawning new harvester: " + newName);
    Game.spawns["MainSpawn"].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
      memory: { role: "harvester" }
    });
  }

  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader");

  if (upgraders.length < 3) {
    const newName = `Upgrader ${Game.time}`;
    console.log("Spawning new upgrader: " + newName);
    Game.spawns["MainSpawn"].spawnCreep(
      [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      newName,
      {
        memory: { role: "upgrader" }
      }
    );
  }

  const builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");

  if (builders.length < 2) {
    const newName = `Builder ${Game.time}`;
    console.log("Spawning new builder: " + newName);
    Game.spawns["MainSpawn"].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
      memory: { role: "builder" }
    });
  }

  if (Game.spawns["MainSpawn"].spawning) {
    const spawningCreep = Game.creeps[Game.spawns["MainSpawn"].spawning.name];
    Game.spawns["MainSpawn"].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns["MainSpawn"].pos.x + 1,
      Game.spawns["MainSpawn"].pos.y,
      { align: "left", opacity: 0.8 }
    );
  }

  /*for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      if (!roleHarvester.run(creep)) roleUpgrader.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      if (!roleBuilder.run(creep)) roleUpgrader.run(creep);
    }
  }*/
});
