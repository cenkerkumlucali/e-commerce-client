import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {HttpClientService} from "../../services/common/http-client.service";
declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,
              private _renderer:Renderer2,
              private httpClient:HttpClientService) {
    const image = _renderer.createElement("img");
    image.setAttribute("src","assets/delete.png");
    image.setAttribute("style","cursor:pointer;");
    image.width = 25;
    image.height = 25;
    _renderer.appendChild(element.nativeElement,image)
  }
  @HostListener("click")
  onClick(){
    const td: HTMLTableCellElement = this.element.nativeElement;
    $(td.parentElement).fadeOut(800);
  }
}
