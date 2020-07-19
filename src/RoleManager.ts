import config from "./config";
import _ from "lodash";
import { keys } from "./utils/utils";

const roles: Array<Role> = [];
for (const filename of config.roles) roles.push(await import(`./roles/${filename}`));

export default {
  /// We are requiring the spawn to have enough energy to build each specified part at least one time
  /// Otherwise, we consider that the spawned creep would not behave normally
  buildBodyparts: function (
    spawn: StructureSpawn,
    desiredRepartition: BodyPartsHolder,
    budget: number
  ): BodyPartConstant[] | false {
    // Compute the minimum cost if each specified part is used only once
    const totalMinCost = keys(desiredRepartition).reduce((acc, bodypart) => acc + BODYPART_COST[bodypart], 0);
    // We return false if this cost is not affordable
    if (totalMinCost > spawn.energy) return false;

    const partCounts: BodyPartsHolder = _.mapValues(desiredRepartition, () => 1);
    let cost: number = totalMinCost;

    while (true) {
      // Compute percentages
      const totalCount = _(partCounts).values().sum();
      // eslint is unable to see that all props have been set to 1, so we can safely
      // assert that no value is undefined by using the "!" operator
      const actualRepartition: BodyPartsHolder = _.mapValues(partCounts, (count) => count! / totalCount);

      // Compute diff
      const diff: BodyPartsHolder = _.mapValues(
        actualRepartition,
        (actualPercentage, bodyPart: BodyPartConstant) => desiredRepartition[bodyPart]! - actualPercentage!
      );

      // Sort
      const sortedDiff: BodyPartsHolder = _(diff).toPairs().orderBy(1, "desc").fromPairs().value();

      // Increment if budget permits it
      // The next part to increment is the first one of the sorted diff
      const nextPart = keys(sortedDiff)[0];
      const nextCost = cost + BODYPART_COST[nextPart];
      if (nextCost > budget) break;

      // Cost is still affordable so increment the part counts
      partCounts[nextPart]!++;
      // Update the cost
      cost = nextCost;
    }

    // Create the resulting bodyParts array
    const bodyParts: BodyPartConstant[] = [];
    keys(partCounts).forEach((partName) => {
      const count = partCounts[partName];
      bodyParts.push(...Array(count).fill(partName));
    });

    return bodyParts;
  },

  run: function (spawn: StructureSpawn): void {
    console.log("wow");
  }
};
