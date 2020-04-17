import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiModule, Configuration, ConfigurationParameters } from '../../api-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: window.location.origin,
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ApiModule.forRoot(apiConfigFactory),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDtmSb3ERdG6e7RYNArwN6CSao1caqXEHY",
      libraries: ["places"],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
