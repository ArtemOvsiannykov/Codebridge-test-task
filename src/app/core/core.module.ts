import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './components/main/main/main.component';
import { FeatureModule } from '../feature/feature.module';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FeatureModule,
    ReactiveFormsModule,
  ],
  exports: [MainComponent, HeaderComponent],
})
export class CoreModule {}
