import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { UserData } from '../../../shared/interfaces/interfaces';


@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {
  public formProfile: FormGroup | any;
  public isModelShow: boolean = false;
  public userData!: UserData | any;
  public dataId: string | any;
  public profile: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProfileModalComponent>
  ) { }

  public ngOnInit(): void {

    this.dataId = Object.keys(this.data)[0];
    this.profile = this.data[`${this.dataId}`];

    this.formProfile = new FormGroup({
      displayName: new FormControl(this.profile.displayName),
      email: new FormControl(this.profile.email),
      birthday: new FormControl(this.profile.birthday),
      gender:  new FormControl(this.profile.gender),
      address: new FormControl(this.profile.address),
      about: new FormControl(this.profile.about),
      phoneNumber: new FormControl(this.profile.phoneNumber)
    });
  }

  public close(): void {
    this.isModelShow = true;
  };

  public submit(): void {
    const userData: UserData = {
      id: this.formProfile.value.id,
      displayName: this.formProfile.value.displayName,
      email: this.formProfile.value.email,
      birthday: this.formProfile.value.birthday,
      gender: this.formProfile.value.gender,
      address: this.formProfile.value.address,
      about: this.formProfile.value.about,
      phoneNumber: this.formProfile.value.phoneNumber
    }

    this.dialogRef.close(userData);

  };
}


