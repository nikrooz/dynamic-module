import { NgModule, Injectable } from '@angular/core';
import { Component, Directive, Pipe } from '@angular/core';

// export { NgModule, Component, Directive, Pipe };

export function CustomComponent(annotation: any) {
  return function(target: Function) {
    const component = new Component(annotation);
    Component(component)(target);
  };
}
export function CustomDirective(annotation: any) {
  return function(target: Function) {
    const directive = new Directive(annotation);
    Directive(directive)(target);
  };
}
export function CustomPipe(annotation: any) {
  return function(target: Function) {
    const pipe = new Pipe(annotation);
    Pipe(pipe)(target);
  };
}

export function CustomNgModule(annotation: any) {
  return function(target: Function) {
    const ngModule = new NgModule(annotation);
    NgModule(ngModule)(target);
  };
}

export function CustomInjectable() {
  return function(target: Function) {
    const injectable = new Injectable();
    Injectable()(target);
  };
}
