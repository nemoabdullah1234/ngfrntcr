import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CognitoUtil, UserLoginService } from '../../../core/aws/cognito.service';
import { UserPoolUserService } from '../../../masters/userpools/shared/userpool.service';
import { DashboardService } from '../services/dashboard.service';
import { MenuItem, ModuleModel } from '../services/menu.model';
import { ScreenService } from '../services/screen.service';

@Component({
  selector: 'layout-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  iisOpen = false;
  isActive = false;
  selectedLink = {};
  menuConf;
  modules: ModuleModel[] = [];
  userDisplayName;
  userDisplayPicture;
  currentUserPreferresRole: string;
  menuSequence = ['dashboard', 'Master', 'Tracking', 'Reports', 'Userpool', 'Admin'];

  constructor(
    public dashboardService: DashboardService,
    public screenService: ScreenService,
    public userService: UserLoginService,
    public userPoolUserService: UserPoolUserService,
    public cognitoUtil: CognitoUtil
  ) {}
  createMenu(): MenuItem[] {
    const sideMenus: MenuItem[] = [];
    let isUserpoolAccess = false;
    let isTrackingAccess = false;
    let isReportsAccess = false;
    let isMasterAccess = false;
    let isCatalogAccess = false;
    let isThingsAccess = false;

    this.modules.forEach(module => {
      // debugger;
      const mainMenu = new MenuItem();
      let catalog, things, tracking, report;

      if (module.name === 'master') {
        catalog = new MenuItem({
          title: 'Catalog',
          id: 'link-catalog',
          link: '',
          icon: 'copy',
          subNav: [],
          active: false
        });
        things = new MenuItem({
          title: 'Things',
          id: 'link-things',
          link: '',
          icon: 'make-group',
          subNav: [],
          active: false
        });
      }

      if (module.name === 'tracking') {
        tracking = new MenuItem({
          title: 'Tracking',
          id: 'link-things',
          link: '',
          icon: 'satellite-dish2',
          subNav: [],
          active: false
        });
      }

      if (module.name === 'reports') {
        report = new MenuItem({
          title: 'Reports',
          id: 'link-reports',
          link: '',
          icon: 'statistics',
          subNav: [],
          active: false
        });
      }

      module.resources.forEach(resource => {
        const menuitem = new MenuItem();
        const menuitem1 = new MenuItem();
        const menuitem2 = new MenuItem();
        // debugger;

        switch (resource.componentName) {
          case 'Products': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Products';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/products';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              catalog.subNav.push(menuitem);
            }
            break;
          }

          case 'Category': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Categories';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/categories';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              catalog.subNav.push(menuitem);
            }
            break;
          }

          case 'Attribute': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Attributes';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/attributes';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              catalog.subNav.push(menuitem);
            }
            break;
          }
          case 'Tags': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Tags';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/tags';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              catalog.subNav.push(menuitem);
            }
            break;
          }
          case 'Collections': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Collections';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/collections';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              catalog.subNav.push(menuitem);
            }
            break;
          }
          case 'Locations': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Locations';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/locations';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              menuitem1.title = 'Floors';
              menuitem1.id = 'link-' + menuitem.title;
              menuitem1.link = '/floors';
              menuitem1.icon = 'copy';
              menuitem1.subNav = null;
              menuitem2.title = 'Zones';
              menuitem2.id = 'link-' + menuitem.title;
              menuitem2.link = '/zones';
              menuitem2.icon = 'copy';
              menuitem2.subNav = null;
              catalog.subNav.push(menuitem);
              catalog.subNav.push(menuitem1);
              catalog.subNav.push(menuitem2);
            }
            break;
          }
          // case 'Branches': {
          //   if (resource.get) {
          //     isMasterAccess = true;
          //     isCatalogAccess = true;
          //     menuitem.title = 'Branches';
          //     menuitem.id = 'link-' + menuitem.title;
          //     menuitem.link = '/branches';
          //     menuitem.icon = 'copy';
          //     menuitem.subNav = null;
          //     catalog.subNav.push(menuitem);
          //   }
          //   break;
          // }
          case 'Tags': {
            if (resource.get) {
              isMasterAccess = true;
              isCatalogAccess = true;
              menuitem.title = 'Tags';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/tags';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              catalog.subNav.push(menuitem);
            }
            break;
          }
          // case 'Surgeries': {
          //   if (resource.get) {
          //     isMasterAccess = true;
          //     isCatalogAccess = true;
          //     menuitem.title = 'Surgeries';
          //     menuitem.id = 'link-' + menuitem.title;
          //     menuitem.link = '/surgeries';
          //     menuitem.icon = 'copy';
          //     menuitem.subNav = null;
          //     catalog.subNav.push(menuitem);
          //   }
          //   break;
          // }
          case 'Gateways': {
            if (resource.get) {
              isMasterAccess = true;
              isThingsAccess = true;
              menuitem.title = 'Gateways';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/things/gateways';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              things.subNav.push(menuitem);
            }
            break;
          }
          case 'Beacons': {
            if (resource.get) {
              isMasterAccess = true;
              isThingsAccess = true;
              menuitem.title = 'Beacons';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/things/beacons';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              things.subNav.push(menuitem);
            }
            break;
          }

          case 'Apps': {
            if (resource.get) {
              isMasterAccess = true;
              isThingsAccess = true;
              menuitem.title = 'Apps';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/things/apps';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              things.subNav.push(menuitem);
            }

            const menuitem4 = new MenuItem();
            isMasterAccess = true;
            isThingsAccess = true;
            menuitem4.title = 'Temperature Tags';
            menuitem4.id = 'link-' + menuitem.title;
            menuitem4.link = '/things/temptags';
            menuitem4.icon = 'copy';
            menuitem4.subNav = null;
            things.subNav.push(menuitem4);

            const menuitem5 = new MenuItem();
            isMasterAccess = true;
            isThingsAccess = true;
            menuitem5.title = 'NFC Tags';
            menuitem5.id = 'link-' + menuitem.title;
            menuitem5.link = '/things/nfctags';
            menuitem5.icon = 'copy';
            menuitem5.subNav = null;
            things.subNav.push(menuitem5);
            break;
          }

          case 'Shipments': {
            if (resource.get) {
              isTrackingAccess = true;
              menuitem.title = 'Shipments';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/shipments';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              tracking.subNav.push(menuitem);
            }
            const menuitem3 = new MenuItem();
            // if (resource.get) {
            isTrackingAccess = true;
            menuitem3.title = 'Notifications';
            menuitem3.id = 'link-' + menuitem3.title;
            menuitem3.link = '/notifications';
            menuitem3.icon = 'copy';
            menuitem3.subNav = null;
            tracking.subNav.push(menuitem3);
            // }
            break;
          }
          case 'Orders': {
            if (resource.get) {
              isTrackingAccess = true;
              menuitem.title = 'Orders';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/orders';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              tracking.subNav.push(menuitem);
            }
            break;
          }

          case 'Permissions': {
            if (resource.get && this.currentUserPreferresRole === environment.adminRole) {
              menuitem.title = 'Permissions';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/permissions';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              menuitem1.title = 'Configuration';
              menuitem1.id = 'link-' + menuitem.title;
              menuitem1.link = '/configuration';
              menuitem1.icon = 'copy';
              menuitem1.subNav = null;
              mainMenu.subNav.push(menuitem);
              mainMenu.subNav.push(menuitem1);

              const menuitemAuditTrail = new MenuItem();
              menuitemAuditTrail.title = 'Audit Trail';
              menuitemAuditTrail.id = 'link-' + menuitem.title;
              menuitemAuditTrail.link = '/audittrails';
              menuitemAuditTrail.icon = 'copy';
              menuitemAuditTrail.subNav = null;
              mainMenu.subNav.push(menuitemAuditTrail);
            }
            break;
          }

          case 'Userpool': {
            if (resource.get) {
              isUserpoolAccess = true;
            }
            break;
          }
          case 'Accepted/Discarded Data Points': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Accepted/Discarded Data Points';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/diagnostics/pointstatus-tracking';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'App Status': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'App Status';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/appstatus';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Carrier-Wise Delayed Deliveries': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Carrier-Wise Delayed Deliveries';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/shipmentdeliverytimecarrier';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Device Locator': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Device Locator';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/devicelocator';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Location-Wise Internal V/S External Delivered Shipments': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Location-Wise Internal V/S External Delivered Shipments';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/shipmentscountbylocation';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Location To Zones Mapping': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Location To Zones Mapping';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/locationzones';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Mobile logs': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Mobile Logs';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/diagnostics/mobilelogs-tracking';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Most Used Products Per Surgeon': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Most Used Products Per Surgeon';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/mostusedequipmentpersurgeon';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Orders Per City': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Orders Per City';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/orderspercity';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Orders Per Hospital': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Orders Per Hospital';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/ordersperhospital';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Orders Per Surgeon': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Orders Per Surgeon';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/orderspersurgeon';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Open Orders - Surgery Date Passed': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Open Orders - Surgery Date Passed';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/ordersnotclosed';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Orders By Surgery Type': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Orders By Surgery Type';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/orderspersurgery';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Orders With Unshipped Products': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Orders With Unshipped Products';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/unshippedproducts';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Partial Shipments': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Partial Shipments';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/partialshipments';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Product Locator': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Product Locator';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/productlocator';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Sensor Locator': {
          //  if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Sensor Locator';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/sensorlocator';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
         //   }
            break;
          }
          case 'Products Ready To Dispatch': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Products Ready To Dispatch';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/productsreadytodispatch';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Product Sensor Mapping': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Product Sensor Mapping';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/productsensor';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Raw Data Points': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Raw Data Points';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/diagnostics/rawsensors-tracking';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Sales Representative-Wise Product Orders': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Sales Representative-Wise Product Orders';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/productsordered';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Sensor Connection Status': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Sensor Connection Status';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/sensorstatus';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Shipments Due': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Shipments Due';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/shipmentsdue';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Shipment Hard Delivered By Web Admin': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Shipments Hard Delivered By Web Admin';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/shipmentharddelivered';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Shipments In Jeopardy': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Shipments In Jeopardy';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/shipmentsinjeopardy';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Stationary Shipments': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Stationary Shipments';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/stationaryshipment';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Total Time Taken For Shipment Deliveries': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Total Time Taken For Shipment Deliveries';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/shipmentdeliverytime';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Undelivered Products': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Undelivered Products';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/productsnotdelivered';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case environment.userType + ' Locator': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = environment.userType + ' Locator';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/userlocator';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
          case 'Login History': {
            if (resource.get) {
              isReportsAccess = true;
              menuitem.title = 'Login History';
              menuitem.id = 'link-' + menuitem.title;
              menuitem.link = '/reports/loginhistory';
              menuitem.icon = 'copy';
              menuitem.subNav = null;
              report.subNav.push(menuitem);
            }
            break;
          }
        }
      });
      // console.log(module);

      switch (module.name) {
        case 'admin': {
          if (this.currentUserPreferresRole === environment.adminRole) {
            // debugger;
            mainMenu.title = 'Admin';
            mainMenu.id = 'link-' + mainMenu.title;
            mainMenu.link = '';
            mainMenu.active = false;
            mainMenu.icon = 'cog3';
            // sideMenus.splice(5,0,mainMenu);
            sideMenus.push(mainMenu);
          }
          break;
        }
        case 'dashboard': {
          mainMenu.title = 'dashboard';
          mainMenu.id = 'link-dashboard';
          mainMenu.link = '';
          mainMenu.icon = 'stats-growth';
          mainMenu.subNav = [];
          mainMenu.active = false;
          // sideMenus.splice(0,0,mainMenu);
          sideMenus.push(mainMenu);
          break;
        }

        case 'tracking': {
          if (isTrackingAccess) {
            mainMenu.title = 'Tracking';
            mainMenu.id = 'link-' + mainMenu.title;
            mainMenu.link = '';
            mainMenu.active = false;
            mainMenu.icon = 'satellite-dish2';
            mainMenu.subNav.push(tracking);
            sideMenus.push(tracking);
            // sideMenus.splice(2,0,mainMenu);
          }
          break;
        }

        case 'master': {
          if (isMasterAccess) {
            mainMenu.title = 'Master';
            mainMenu.id = 'link-' + mainMenu.title;
            mainMenu.link = '';
            mainMenu.active = false;
            mainMenu.icon = 'copy';
            if (isCatalogAccess) {
              mainMenu.subNav.push(catalog);
            }
            if (isThingsAccess) {
              mainMenu.subNav.push(things);
            }
            sideMenus.push(mainMenu);
            // sideMenus.splice(1,0,mainMenu);
          }

          break;
        }

        case 'reports': {
          if (isReportsAccess) {
            sideMenus.push(report);
          }
          break;
        }
        //Reports//

        case 'userpool': {
          if (isUserpoolAccess) {
            mainMenu.title = 'Userpool';
            mainMenu.id = 'link-' + mainMenu.title;
            mainMenu.link = '';
            mainMenu.active = false;
            mainMenu.icon = 'users';

            // const detail = new MenuItem({
            //   title: 'Detail',
            //   id: 'link-detail',
            //   link: '/userpools',
            //   icon: 'statistics',
            //   subNav: null,
            //   active: false
            // });

            const users = new MenuItem({
              title: 'Users',
              id: 'link-master-userpool-users',
              link: '/userpools/users',
              icon: 'cog3',
              subNav: null,
              active: false
            });

            const groups = new MenuItem({
              title: 'Groups',
              id: 'link-master-userpool-users',
              link: '/userpools/groups',
              icon: 'cog3',
              subNav: null,
              active: false
            });

            // const attributes = new MenuItem({
            //   title: 'Attributes',
            //   id: 'link-master-userpool-attribute',
            //   link: '/userpools/attributes',
            //   icon: 'cog3',
            //   subNav: null,
            //   active: false
            // });

            const policies = new MenuItem({
              title: 'Policies',
              id: 'link-master-userpool-policies',
              link: '/userpools/policies',
              icon: 'cog3',
              subNav: null,
              active: false
            });

            // const clients = new MenuItem({
            //   title: 'Clients',
            //   id: 'link-master-userpool-clients',
            //   link: '/userpools/clients',
            //   icon: 'cog3',
            //   subNav: null,
            //   active: false
            // });

            const message = new MenuItem({
              title: 'Message customizations',
              id: 'link-master-userpool-message',
              link: '/userpools/messages',
              icon: 'cog3',
              subNav: null,
              active: false
            });
            // mainMenu.subNav.push(detail);
            mainMenu.subNav.push(users);
            mainMenu.subNav.push(groups);
            // mainMenu.subNav.push(attributes);
            mainMenu.subNav.push(policies);
            // mainMenu.subNav.push(clients);
            mainMenu.subNav.push(message);
            sideMenus.push(mainMenu);
            // sideMenus.splice(4,0,mainMenu);
            break;
          }
        }
      }
    });
    return this.menuSequence.map(menu => {
      const sm = sideMenus.reduce((a, b) => {
        a[b.title] = b;
        return a;
      }, {});
      return sm[menu];
    });

    // return sideMenus;
  }

  ngOnInit() {
    this.userDisplayName = '';
    this.userDisplayPicture = '';
    this.currentUserPreferresRole = this.userPoolUserService.userDetails('cognito:preferred_role');

    let permissionsModel = null;
    if (window.localStorage.getItem('permissions')) {
      permissionsModel = JSON.parse(window.localStorage.getItem('permissions'));
    }
    if (permissionsModel && permissionsModel.hasOwnProperty('data')) {
      this.modules = permissionsModel.data.modules;
    }
    this.menuConf = this.createMenu();
    this.menuConf = this.menuConf.filter((val, i) => {
      i;
      if (val !== 'undefined') {
        return val;
      }
    });
    // console.log(permissionsModel);
    // this.menuConf = this.DashboardService.menuConf;
    this.userService.isAuthenticated(this);
  }
  makeMeActive(item) {
    this.menuConf.forEach((element: any) => {
      if (element.title !== item.title) {
        element.active = false;
      }
    });
    item.active = !item.active;
  }

  toggleSubnav(item, $event) {
    // debugger;
    this.menuConf.forEach((element: any) => {
      element.subNav.forEach(subItem => {
        if (subItem.title !== item.title) {
          subItem.active = false;
        }
      });
    });
    item.active = !item.active;
    $event.stopPropagation();
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    message;
    const userPoolService = this.userPoolUserService;
    if (isLoggedIn) {
      // issue on load if user's token is expired. logout
      this.cognitoUtil.getSessionState().subscribe(state => {
        if (state === 0) {
          // log out user
          this.userService.logout();
          this.userService.redirectToLogin(true);
        }
      });

      this.userDisplayName = '';
      this.userDisplayPicture = '';
      userPoolService.getUser(this.cognitoUtil.accessToken).subscribe(
        res => {
          let foundDefaultTimeZone = false;
          for (let i = 0; i < res['UserAttributes'].length; i++) {
            if (res['UserAttributes'][i]['Name'] === 'given_name') {
              this.userDisplayName += res['UserAttributes'][i]['Value'];
            }

            if (res['UserAttributes'][i]['Name'] === 'family_name') {
              this.userDisplayName += ' ' + res['UserAttributes'][i]['Value'];
            }

            if (res['UserAttributes'][i]['Name'] === 'picture') {
              this.userDisplayPicture = res['UserAttributes'][i]['Value'];
            }

            // also set user time zone here
            if (res['UserAttributes'][i]['Name'] === 'zoneinfo') {
              foundDefaultTimeZone = true;
              window.localStorage.setItem('userTimeZone', res['UserAttributes'][i]['Value']);
            }
          }

          // fall back if user has no timezone
          if (!foundDefaultTimeZone) {
            window.localStorage.setItem('userTimeZone', environment.defaultConfig.timeZone);
          }
        },
        (err: any) => {
          // can't shadow error. Do something here
          err;
          this.userDisplayName = '';
        }
      );
    }
  }
}
