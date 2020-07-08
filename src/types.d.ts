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

// Numbers are all between 0 and 1 (percentages)
type Skills = { [bodypart in BodyPartConstant]: number };

interface Role {
  name: string;
  skills: Skills;

  // Returns whether the role was performed this tick or not
  run: (creep: Creep) => boolean;
}

// Custom type
type Dictionnary<T> = { [key: string]: T };
