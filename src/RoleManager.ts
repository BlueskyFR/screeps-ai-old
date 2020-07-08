import config from "./config";
import _ from "lodash";

let roles: Dictionnary<Role> = {};
for (let filename of config.roles) roles[filename] = require(`./roles/${filename}`);

export default {
  run: function (spawn: StructureSpawn) {
    function buildBodyparts(skillsRepartition: Skills, budget: number): BodyPartConstant[] | false {
      let totalMinCost = Object.keys(skillsRepartition).reduce((acc, bodypart) => acc + BODYPART_COST[bodypart], 0);

      if (totalMinCost > spawn.energy) return false;

      let bodyparts: BodyPartConstant[] = Object.keys(skillsRepartition) as BodyPartConstant[];

      skillsRepartition = _(skillsRepartition).toPairs().orderBy(1, "desc").fromPairs().value();

      let currentBudget: number = 0, i: number = 0, count: number = ;

      while (true) {


        i = (i + 1) %
      }
    }
  }
};
