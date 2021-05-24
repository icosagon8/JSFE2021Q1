import { Component } from '../components/component';

export interface RouteModel {
  path: string;
  Page: typeof Component;
}
