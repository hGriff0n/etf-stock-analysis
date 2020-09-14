import { NgModule } from "@angular/core";

import { FunddescComponent, SwitchFundDialog } from './funddesc.component';
import { CommonModule } from "@angular/common";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ FunddescComponent, SwitchFundDialog ],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        FormsModule
    ],
    entryComponents: [
      SwitchFundDialog
    ],
    exports: [
        FunddescComponent, SwitchFundDialog
    ]
})
export class FunddescModule {}
