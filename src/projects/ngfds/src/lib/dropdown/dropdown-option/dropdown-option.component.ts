import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { DropdownComponent } from '../dropdown.component';

@Component({
  selector: 'fds-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.css'],
})
export class DropdownOptionComponent implements OnInit, OnDestroy {

  private _value: unknown | null = null;
  @Input()
  public get value(): unknown | null {
    return this._value ?? this.text;
  }
  public set value(value: unknown | null) {
    this._value = value;
  }

  public get text(): string {
    const elem: HTMLElement = this.el.nativeElement;
    return elem.innerText.length !== 0 ? elem.innerText : (this.value as any)?.toString() ?? '';
  }

  constructor(
    public el: ElementRef,
    @Optional() protected parent: DropdownComponent) { }

  ngOnInit(): void {
    this.parent.registerOption(this);
  }

  ngOnDestroy(): void {
    this.parent.unregisterOption(this);
  }
}
