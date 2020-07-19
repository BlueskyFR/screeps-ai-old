// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  building?: boolean;
  upgrading?: boolean;
  //room: string;
  //working: boolean;
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

// Can hold percentages or counts
type BodyPartsHolder = Partial<Record<BodyPartConstant, number>>;
// or
//type BodyPartsHolder = { [bodypart in BodyPartConstant]?: number };

interface Role {
  name: string;
  bodyPartsRepartition: BodyPartsHolder;

  // Returns whether the role was performed this tick or not
  run: (creep: Creep) => boolean;
}

// Custom type
type Dictionnary<T> = { [key: string]: T };
