export class UserUpdate {
  email: string;
  firstname: string;
  lastname: string;
  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_mentor: boolean;
  stack_id: number;
  level_id: number;
  technology_id: number;
  system_level_id: number;
  people_id: number;
  soft_skill_id: number;
  english_level_id: number;
  performance_level_id: number;
  influence_id: number;

  constructor(user: any, isDelete: boolean) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.is_verified = true;
    this.is_active = isDelete ? !isDelete : user.isActive;
    this.is_admin = user.isAdmin;
    this.is_mentor = user.isMentor;
    this.stack_id = user.stack;
    this.level_id = user.level;
    this.technology_id = user.technology;
    this.system_level_id = user.system;
    this.people_id = user.people;
    this.soft_skill_id = user.softSkills;
    this.english_level_id = user.englishLevel;
    this.performance_level_id = user.performanceLevel;
    this.influence_id = user.influence;
  }
}
