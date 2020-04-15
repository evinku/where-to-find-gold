import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { GoldPlacesService } from '../../api-service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbRatingConfig],
})
export class AppComponent implements OnInit {
  constructor(
    private goldPlacesService: GoldPlacesService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  results: any = [];

  public zoom: number;
  public latitude: number;
  public longitude: number;
  status: string;

  max = 50;
  min = 0;
  step = 1;
  thumbLabel = true;
  radius = 5;
  tickInterval = 1;

  showSpinner: boolean;

  ngOnInit() {
    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getGoldPlaces();
      });
    }
  }

  onLocationSelected(location: Location) {
    console.log("onLocationSelected: ", location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.getGoldPlaces();
  }

  onSlideEnd() {
    this.getGoldPlaces();
  }

  getGoldPlaces() {
    this.results = [];
    this.goldPlacesService
      .goldPlacesLatitudeLongitudeRadiusGet(
        this.latitude,
        this.longitude,
        this.radius
      )
      .subscribe((res) => {
        console.log(res);
        this.status = res.status;
        this.results = res.results.sort(
          (a, b) =>
            parseFloat(b.user_ratings_total) - parseFloat(a.user_ratings_total)
        );
      });
  }
}
