import {NgModule} from '@angular/core';

import {
  MatSlideToggleModule,
  MatInputModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatRadioModule,
} from '@angular/material';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRadioModule,
  ]
})
export class CustomMaterialModule {}
