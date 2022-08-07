import { Level } from './level.model';
import { Stack } from '../interfaces/stack.interface';
import { BaseSkills } from './base-skills.model';

export class UserForAdmin {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  isManager: boolean;
  isMentor: boolean;
  isActive: boolean;
  level: Level;
  stack: Stack;
  extraStacks: Stack[];
  englishLevel: BaseSkills;
  influence: BaseSkills;
  people: BaseSkills;
  performanceLevel: BaseSkills;
  softSkills: BaseSkills;
  system: BaseSkills;
  technology: BaseSkills;
  mentor: any;
  manager: any;

  constructor(source: any) {
    this.id = source.id;
    this.email = source.email;
    this.firstname = source.firstname;
    this.lastname = source.lastname;
    this.isAdmin = source.is_admin;
    this.isMentor = source.is_mentor;
    this.isManager = source.is_manager;
    this.isActive = source.is_active;
    this.level = new Level(source.level);
    this.stack = source.stack;
    this.extraStacks = source.extra_stack;
    this.englishLevel = new BaseSkills(source.skills.english_level);
    this.influence = new BaseSkills(source.skills.influence);
    this.people = new BaseSkills(source.skills.people);
    this.performanceLevel = new BaseSkills(source.skills.performance_level);
    this.softSkills = new BaseSkills(source.skills.soft_skill);
    this.system = new BaseSkills(source.skills.system_level);
    this.technology = new BaseSkills(source.skills.technology);
    this.mentor = source.mentor;
    this.manager = source.manager;
  }
}
