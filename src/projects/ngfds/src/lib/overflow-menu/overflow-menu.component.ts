import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ItemSelectedEvent,
  NavigationItemHelper,
} from '../helpers/navigation-item-helper';
import * as DKFDS from 'dkfds';
import { DkfdsHelper } from '../helpers/dkfds-helper';

@Component({
  selector: 'fds-overflow-menu',
  templateUrl: './overflow-menu.component.html',
})
export class OverflowMenuComponent implements AfterViewInit {
  @Input()
  public items: IOverflowNavigationItem[] = [];

  @Input()
  public placeholder: string = '';

  @Input('selected-item')
  public selectedItem: IOverflowNavigationItem | null = null;

  @Input('hide-icon')
  public hideIcon: boolean = false;

  @Input()
  public icon: string = 'more-vert';

  @Output('item-clicked')
  public itemClicked: EventEmitter<ItemSelectedEvent<IOverflowNavigationItem>> =
    new EventEmitter();
  
  @ViewChild('dropdownTrigger')
  dropdownTrigger!: ElementRef<HTMLButtonElement>;

  dropdownControl: DKFDS.Dropdown | null = null;

  static idGenerator: number = 1;

  id: string = (OverflowMenuComponent.idGenerator++).toString();
  helper: NavigationItemHelper<IOverflowNavigationItem>;

  constructor(router: Router, private element: ElementRef) {
    this.helper = new NavigationItemHelper<IOverflowNavigationItem>(
      router,
      this.itemClicked
    );
  }

  onItemClicked(ev: Event, item: IOverflowNavigationItem): void {
    this.helper.handleClick(ev, item);
  }
  ngAfterViewInit(): void {
    this.dropdownControl = DkfdsHelper.createAndInit(DKFDS.Dropdown, this.dropdownTrigger);
  }
}

export interface IOverflowNavigationItem {
  title: string;
  url: string | null;
}
export class OverflowNavigationItem implements IOverflowNavigationItem {
  public title: string = '';
  public url: string | null = null;

  constructor(values: Partial<OverflowNavigationItem>) {
    Object.assign(this, values);
  }
}
