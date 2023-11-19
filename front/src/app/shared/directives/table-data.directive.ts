import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableData]',
})
export class TableDataDirective {
  @Input() appTableData: string = '';

  constructor(public templateRef: TemplateRef<{ $implicit: any }>) {}
}
