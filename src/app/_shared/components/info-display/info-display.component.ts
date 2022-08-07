import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LEVEL_LIST_FIELDS} from "../../../_core/constants/constants";
import {GoalsModalComponent} from "../goals-modal/goals-modal.component";
import {ModalService} from "../../../_core/services/global/modal.service";

@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrls: ['./info-display.component.scss'],
})
export class InfoDisplayComponent {
  @Input() set data(info: any) {
    this.userData = info;
    this.isEmptyData = !info.data.length;
    this.initializeForm();
  };

  @Input() editMode: boolean;

  userData: any;

  levelFields = LEVEL_LIST_FIELDS;

  isEmptyData = true;

  constructor(private fb: FormBuilder, private modalService: ModalService) {}

  editForm: FormGroup;

  openShowModal(data: any) {
    const settings = data;
    this.modalService
      .create<GoalsModalComponent>(GoalsModalComponent, { settings }, true)
      .then(modalRef => {
        modalRef.instance.result.subscribe((result: any) => {
          if (result) {

          } else {
            modalRef.instance.closeModal();
          }
        },
        () => {
          modalRef.instance.closeModal();
        }
        );
      });
  }


  private initializeForm(): void {
    const formControls = this.userData.data.reduce((memo: any, item: any, index: number) => {
      memo['item' + index] = new FormControl({ value: item.id || item.value || '', disabled: false }, []);

      if (item.additionalDataValues) {
        memo['additional' + index] = new FormControl({ value: item.additionalDataValues || '', disabled: false }, []);
      }
      return memo;
    }, {});
    this.editForm = this.fb.group(formControls);
  }
}
