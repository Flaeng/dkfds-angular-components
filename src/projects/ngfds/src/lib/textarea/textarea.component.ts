import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as DKFDS from 'dkfds';
import { AngularHelper } from '../helpers/angular-helper';
import { DkfdsHelper } from '../helpers/dkfds-helper';
import { NgModelComponent } from '../ng-model-component';

@Component({
  selector: 'fds-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [...AngularHelper.formInput(TextareaComponent)],
})
export class TextareaComponent
  extends NgModelComponent<string>
  implements AfterViewInit, OnChanges
{
  // @Input('auto-expand')
  // public autoExpand: boolean = false;

  @Input()
  public rows: number = 5;

  @Input()
  public override disabled: boolean = false;

  @Input()
  public maxlength: number | null = null;

  @Input('show-character-limit')
  public showCharacterLimit: boolean = false;

  _value: string = '';
  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
    this.onChange?.call(this, value);
    this.onTouched?.call(this);
  }

  static idGenerator = 1;

  id: string = (TextareaComponent.idGenerator++).toString();

  @ViewChild('formControlWrapper')
  formControlWrapper: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('formControl')
  formControl: ElementRef<HTMLTextAreaElement> | undefined;

  underlayingControl: DKFDS.CharacterLimit | null = null;

  ngAfterViewInit(): void {
    // this.autoExpandIfSet();

    if (!this.formControlWrapper) return;
    if (this.showCharacterLimit === true) {
      this.setupUnderlayingControl();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    if (this.showCharacterLimit === true) {
      this.setupUnderlayingControl();
    } else if (this.underlayingControl !== null) {
      this.underlayingControl = null;
    }
  }

  // private autoExpandIfSet() {
  //   if (!this.formControl) return;
  //   const ctrl = this.formControl.nativeElement;
  //   const offset = ctrl.offsetHeight - ctrl.clientHeight;
  //   ctrl.addEventListener('input', () => {
  //     if (this.autoExpand) {
  //       ctrl.style.height = 'auto';
  //       ctrl.style.height = ctrl.scrollHeight + offset + 'px';
  //     }
  //   });
  // }

  private setupUnderlayingControl() {
    if (this.underlayingControl !== null) return;
    if (!this.formControlWrapper) return;
    this.underlayingControl = DkfdsHelper.createAndInit(
      DKFDS.CharacterLimit,
      this.formControlWrapper
    );
  }

  setValue(obj: string): void {
    this.value = obj;
  }
}
