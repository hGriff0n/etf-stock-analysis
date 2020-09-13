import { Component, Input } from '@angular/core';

// This doesn't quite work correctly though
@Component({
    selector: 'in-app-link',
    templateUrl: './page_link.component.html',
    styleUrls: ['./page_link.component.scss']
})
export class InAppMenuLinkComponent {
    @Input() icon: string;
    @Input() link: string;
    @Input() text: string;

    markActive() {

    }
}
