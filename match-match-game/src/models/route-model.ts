import { BaseComponent } from '../components/base-component';

export interface RouteModel {
  path: string;
  Page: typeof BaseComponent;
}
