import { Pipe, PipeTransform } from '@angular/core';
import {PROFILE_DISPLAY_HEADS_NAMES, PROFILE_DISPLAY_PRACTICES, PROFILE_DISPLAY_EXTRA_STACKS} from "../../_core/constants/constants";

@Pipe({
  name: 'userProfileValue'
})
export class UserProfileValuePipe implements PipeTransform {

  transform(user: any, field: string) {
    let data = user[field];
    if (PROFILE_DISPLAY_HEADS_NAMES.includes(field)) {
      data = user[field] ? `${user[field].firstname} ${user[field].lastname}` : null;
    } else if (PROFILE_DISPLAY_PRACTICES.includes(field)) {
      data = user[field].title;
    } else if (field == PROFILE_DISPLAY_EXTRA_STACKS) {
      data = data.map((el: { title: string; }) => el.title).join(', ');
    }

    return data;
  }

}
