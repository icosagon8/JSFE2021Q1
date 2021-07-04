export interface RouteModel {
  name: string;
  path: string;
  Page: any; // TODO: replace type any with the correct type
  menu: boolean;
}
