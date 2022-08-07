import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Stack } from 'src/app/_core/interfaces/stack.interface';
import { Level } from 'src/app/_core/models/level.model';
import { User } from 'src/app/_core/models/user.model';
import { UserService } from 'src/app/_core/services/users/users.service';
import { AlertService } from '../../_core/services/global/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetricsService } from 'src/app/_core/services/global/metrics.service';
import { LEVEL_LIST_FIELDS, PROFILE_DISPLAY_BUTTONS, PROFILE_DISPLAY_FIELDS } from "../../_core/constants/constants";
import { ProfileFieldsEnum } from "../../_core/enums/profile-fields-title.enum";
import { SkillsEnum } from "../../_core/enums/skills.enum";
import { Goal } from "../../_core/models/objective.model";

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  editMode: boolean = false;
  isLoading: boolean = false;
  user: User;
  role: string;
  profileForm: FormGroup;
  stacks$: Observable<Stack[]>;
  extraStacks$: Observable<Stack[]>;
  levels$: Observable<Level[]>;
  id: string;
  isNotCurrentUserProfile: boolean;
  skills: any;
  profileFields: string[] = PROFILE_DISPLAY_FIELDS;
  fieldsWithButtons: string[] = PROFILE_DISPLAY_BUTTONS;
  profileFieldsEnum = ProfileFieldsEnum;
  skillsFields = LEVEL_LIST_FIELDS;
  displayData: any;
  displayTitle: string = '';
  displayEditMode = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private metricsService: MetricsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.url.includes('profile?id')) {
        this.isNotCurrentUserProfile = true;
        this.id = params['id'];
      }
    });
  }

  ngOnInit(): void {
    if (this.isNotCurrentUserProfile) {
      this.subscription.add(
        this.userService.getUserByIdData(this.id).subscribe((user) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
    } else {
      this.subscription.add(
        this.userService.getUser().subscribe((user) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
    }
  }

  setDisplayData(user: any, field: string) {
    this.displayEditMode = false;

    if (this.displayTitle === field) {
      this.displayTitle = '';
      return;
    }

    const data = user[field];

    const info: any = {};
    if (field === 'skills') {
      info.data = LEVEL_LIST_FIELDS.map((level: string) => {
        return {
          title: (SkillsEnum as any)[level],
          value: data[level].title,
          id: data[level].id
        }
      });
      info.editData = this.metricsService.skillsSubject.getValue();
    } else {
      info.data = data.map((item: Goal) => {
        const info: any = { value: item.title, ...item };
        if (item.additionalData) {
          info.additionalDataValues = Object.keys(item.additionalData).map(key => `${key} : ${item.additionalData[key]}`) || null;
        }

        return info;
      });
    }

    this.displayTitle = field;
    this.displayData = info;
  }

  getFieldTitle(title: string | any) {
    return (ProfileFieldsEnum as any)[title] || title;
  }

  getSkillTitle(skill: string) {
    return (SkillsEnum as any)[skill];
  }

  setUser(user: User) {
    this.user = user;
    if (this.user?.isAdmin) {
      this.role = 'Admin';
    } else if (this.user?.isMentor) {
      this.role = 'Mentor';
    } else {
      this.role = 'Employee';
    }

    const skillsSubjectubScription = this.metricsService.skillsSubject.subscribe((skills) => {
      const activeSkills: any = Object.assign({ ...skills });
      Object.entries(activeSkills).forEach((item) => {
        (activeSkills as any)[item[0]] = (item as any)[1]?.filter((i: any) => i.is_active) || item[1];
      });
      this.skills = activeSkills;
    });

    this.subscription.add(skillsSubjectubScription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
