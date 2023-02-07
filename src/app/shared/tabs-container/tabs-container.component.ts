import { AfterContentInit, Component, ContentChildren, Query, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  constructor() {}

  ngAfterContentInit(): void {
    // this.tabs
    // console.log(this.tabs);
  }
}
