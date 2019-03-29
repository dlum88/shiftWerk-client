import { Component,  EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ShiftService } from 'src/app/shift.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maker-create-shift',
  templateUrl: './maker-create-shift.component.html',
  styleUrls: ['./maker-create-shift.component.scss'],
})

export class MakerCreateShiftComponent implements OnInit {

  sForm: FormGroup;
  count: number = 0;
  position: FormGroup;
  view: any;

  @Input()
  maker: any;
  constructor(
    private fb: FormBuilder,
    private shiftService: ShiftService,
    public toastController: ToastController,
    private router: Router) {
    }

    @Output() NavClick = new EventEmitter<'home'>();

    async presentToast(answer) {
      const toast = await this.toastController.create({
        message: `Event ${answer}...Thanks!`,
        duration: 2000,
        color: 'primary',
        position: 'top'
      });
      toast.present();
    }

  ngOnInit() {
    this.sForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      // duration: new FormControl(),
      description: new FormControl(),
      positions: new FormArray([])
    });
  }

  get positions () {
    return this.sForm.get('positions') as FormArray;
  }

  addPosition() {
    this.position = new FormGroup({
      [`position${this.count}`]: new FormControl(),
      // [`quantity${this.count}`]: new FormControl(),
      [`payment_amnt${this.count}`]: new FormControl(),
      [`payment_type${this.count}`]: new FormControl(),
    });
    this.positions.push(this.position);
    this.count++;
  }

  deletePosition(i) {
    this.positions.removeAt(i);
  }


  submit = (answer) => {
    console.log('submitting');
    console.log(this.sForm.value);
    this.shiftService.submitShift(this.sForm.value, this.maker.id).subscribe(response => {
      console.log(response);
      });
      this.update(answer);
    // create shift - on submit click =>
    // redirect to home-unfilled-shifts (to invite)
    // this.view = 'home';
    this.router.navigate([`maker-home`])
  }
  update(answer) {
    console.log('Toast Submit');
    this.presentToast(answer);
  }
}
