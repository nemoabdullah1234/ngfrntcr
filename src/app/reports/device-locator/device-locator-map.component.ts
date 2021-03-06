import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// ChangeDetectionStrategy
import { LocationService } from '../../masters/locations/shared/location.service';
import { LocatormapService } from '../../masters/map/shared/leaflet/locatormap.service';
import { LocatortypeFactory } from '../../core/widget/maps/locatormap/locators/locatortype.factory';
import { ReportService } from '../shared/report.service';
import { GlobalService } from '../../core/global.service'
// import * as L from 'leaflet';
const L = require('leaflet');

import { DatePipe } from '@angular/common';
import 'leaflet.markercluster';

@Component({
  selector: 'app-devicelocator-map',
  templateUrl: './device-locator-map.component.html',
  // styleUrls: ['./map.component.css'],
  providers: [GlobalService, LocationService, LocatormapService, LocatortypeFactory, ReportService, DatePipe],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceLocatorMapComponent implements OnInit, OnDestroy, AfterViewInit {

  cluster:any;
  lat = 28.6252;
  lng = 77.3732;
  zoom = 18;
  locations: any;
  isError = false;
  latlngbounds: any;
  knownLocations: any;
  unknownLocations: any;
  itemsMap: any;
  icons: any;
  map:any;
  liveUpdate: boolean;
  toggleLiveLabel: string;

  constructor(
    private globalService: GlobalService,
    private locationService: LocationService,
    private locatormapService: LocatormapService,
    private reportService: ReportService
  ) {
    this.liveUpdate = true;
    this.toggleLiveLabel = 'Stop Live Updates';
    
      this.cluster = L.markerClusterGroup();
      this.locations = [];

      this.icons = this.globalService.getIconList();

      const self = this;
      this.locationService.getAll('').subscribe((data:any) => {
          this.knownLocations = [];
          this.unknownLocations = [];
          data.data.forEach((row:any) => {

            this.knownLocations.push({
                id: row.id,
                key : row.id,
                lat: row.coordinates.latitude,
                lng: row.coordinates.longitude,
                location: row.name,
                address: this.globalService.formatCommaSeperatedData([ row.address, row.city, row.state, row.country ]),
                // itemCount : this.mapService.getIconText(''),
                items: [],
                lastTracked: 0,
                icon: this.icons.known_noitems
            });
          });

        this.itemsMap = {};

        this.reportService.deviceLocatorMap('').subscribe(mapdata => {
          // console.log(mapdata.data);
          mapdata.data.forEach((maprow) => {
            this.knownLocations = this.knownLocations.map((locrow:any) => {
              if (locrow.key === maprow.key ) {
                maprow.devices.forEach( (mapprodrow:any) => {
                  locrow.items.push({
                    itemId: mapprodrow.code,
                    detailsurl: '',
                    fields: [
                      {
                        label : 'Code',
                        name : 'code',
                        value : mapprodrow.code
                      },
                      {
                        label : 'Name',
                        name : 'name',
                        value : mapprodrow.name
                      },
                      {
                        label : 'Sensor',
                        name : 'sensor',
                        value : mapprodrow.sensor.code
                      },
                      {
                        label : 'Last Tracked',
                        name : 'dt',
                        value : this.globalService.formatUserDate(mapprodrow.trackedAt)
                      }
                    ]
                  });
                });
                if (maprow.type === 'known') {
                  locrow.icon = this.icons.known_items;
                } else {
                  locrow.icon = this.icons.unknown_items;
                }

                return locrow;
              } else {
                return locrow;
              }
            })
          });
          // console.log("AFER PROCESS")
          // console.log(this.knownLocations)
          this.locations = this.knownLocations;

          this.renderPoints();

          locatormapService.initQueue('device', this.locations, (locations:any) => {
              self.locations = locations;
              // console.log("HEREEE")
              // console.log(locations)
              this.renderPoints();
          });
        });

      }, () => {
          // No Handling
      }, () => {

      });

  }

  ngOnInit() {
    // this.initializeMap();
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    this.locatormapService.closeQueue();
  }

  initializeMap() {
    let self = this;
      this.map = L.map('map').setView(L.latLng(28.6252, 77.3732), 5);
      L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
      }).addTo(this.map);

      const legend = L.control({position: 'topleft'});

      legend.onAdd = function (map:any) {
          map;
          const div = L.DomUtil.create('div', 'info legend');
          const locations = ['Known Location', 'Known Location with devices', 'In-transit Location'];
          const labels = [ self.icons.known_noitems, 
            self.icons.known_items, 
            self.icons.unknown_items];

          // loop through our density intervals and generate a label with a colored square for each interval
          for (let i = 0; i < locations.length; i++) {
              div.innerHTML +=
                  (' <img src=' + labels[i] + '> ') + '<span>' + locations[i] + '</span><br>';
          }

          return div;
      };

      legend.addTo(this.map);
  }

  renderPoints () {
    // let myIcon =  L.icon( { iconUrl: 'assets/marker-icon.png', shadowUrl: 'assets/marker-shadow.png' } );
    let myIcon =  L.icon( { iconUrl: this.icons.known_noitems, shadowUrl: this.icons.known_noitems } );
    this.cluster.clearLayers();
    for (let i = 0; i < this.locations.length; i++) {
      const a = this.locations[i];
      const title = a.location;
      if ( a.icon !== null ) {
        myIcon =  L.icon( { iconUrl: a.icon, shadowUrl: a.icon } );
      }
      const marker = L.marker(new L.LatLng(a.lat, a.lng), {icon: myIcon, title: title });
      let info = '';
      info += '<div style="margin-bottom: -12px;"><div>' + title + '</div>';
      if (typeof a.address !== 'undefined') {
        info += (a.address);
      }

      info += '</div></br>';
      if ( a.items ) {
        for (let j = 0; j < a.items.length; j++ ) {
          if ( a.items[j].fields ) {
            info += '<div>';
            for (let k = 0; k < a.items[j].fields.length; k++ ) {
              info += '<strong>' + a.items[j].fields[k].label + ': </strong>' + a.items[j].fields[k].value + '<br/>';
            }
            info += '</div>';
          }
          // info += '<div><a href=' + a.items[j].detailsUrl + '>Go To Details</a></div>';
        }
      }
      marker.bindPopup(L.popup({maxHeight: 300}).setContent(info));
      this.cluster.addLayer(marker);
    }

    this.map.addLayer(this.cluster);
  }

   /**
   * Refresh map after change in map data
   *
   * @memberof DeviceLocatorMapComponent
   */
  refreshMap( ) {
    // set fitBounds here
    this.map.fitBounds(this.cluster.getBounds(), {maxZoom: 5});
  }

  toggleLiveUpdates() {
    const self = this;
    if ( this.liveUpdate === false ) {
      this.liveUpdate = true;
      this.toggleLiveLabel = 'Stop Live Updates';
      this.locatormapService.initQueue('shipment', this.locations, (locations:any) => {
        self.locations = locations;
        self.renderPoints();
    });
    } else {
      this.liveUpdate = false;
      this.toggleLiveLabel = 'Start Live Updates';
      this.locatormapService.closeQueue();
    }
  }

}

