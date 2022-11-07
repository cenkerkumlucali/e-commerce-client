import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {BaseComponent} from "../../base/base.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef          : Dinamik olarak yüklenilecek komponenti içerisinde barındıran containerdır. (Her dinamik yükleme sürecinde önceki viewleri clear etmemiz gerekmektedir.)
  //ComponentFactory          : Komponentlerin instancelerini oluşturmak için kullanılan nesnedir.
  //ComponentFactoryResolver  : Belirli bir komponent için ComponentFactoryi resolve eden sınıftır. İçerisindeki fonsksiyon aracılığıyla ilgili componente dair bir ComponentFactory nesnesi oluşturup, döner.
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;
    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
  }
}

export enum ComponentType {
  BasketsComponent
}
