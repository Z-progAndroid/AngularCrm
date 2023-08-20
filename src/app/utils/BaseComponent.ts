import { AfterViewInit, Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class BaseComponent implements AfterViewInit {
    borderNgSelectFocus: string = '2px #3B71CA solid';
    colorNgSelectLabelColorFocus: string = '#3B71CA';
    borderNgSelectFocusOut: string = '1px #BDBDBD solid';
    colorNgSelectLabelColorFocusOut: string = '#4F4F4F';
    constructor() { }
    ngAfterViewInit(): void {
        this.focusNgSelect();
    }
    focusNgSelect(): void {
        let select = document.querySelectorAll('.floating-label.ng-select-js input');
        if (select.length == 0) return;
        select.forEach((element) => {
            element.addEventListener('focus', () => {
                let ng_select = element.parentElement.parentElement.parentElement.parentElement;
                let ng_select_label = element.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('label');
                if (!ng_select || !ng_select_label) { return; }
                ng_select.style.border = this.borderNgSelectFocus;
                ng_select_label.style.color = this.colorNgSelectLabelColorFocus;
            });
            element.addEventListener('blur', () => {
                let ng_select = element.parentElement.parentElement.parentElement.parentElement;
                let ng_select_label = element.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('label');
                if (!ng_select || !ng_select_label) { return; }
                ng_select.style.border = this.borderNgSelectFocusOut;
                ng_select_label.style.color = this.colorNgSelectLabelColorFocusOut;
            });
        });
    }
}