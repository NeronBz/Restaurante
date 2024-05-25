import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './routes/auth/guards/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantModule } from './routes/restaurant/restaurant.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    RestaurantModule,
  ],
  providers: [provideAnimationsAsync(), AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
