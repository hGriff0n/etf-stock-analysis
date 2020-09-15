import { Component, OnInit, ContentChildren, QueryList, forwardRef, ViewChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'graph',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
  styleUrls: ['./graphs.component.scss']
})
export class GraphComponent {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input()
  label: string;

}

@Component({
  selector: 'app-graph-holder',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphHolderComponent {

  @ContentChildren(GraphComponent) children: QueryList<GraphComponent>;

  @Input()
  tabPosition: 'above' | 'below' = 'above';

}
