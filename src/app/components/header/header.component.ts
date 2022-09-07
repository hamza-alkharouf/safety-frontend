import { Component, HostListener, Input, OnInit } from '@angular/core';
import { languages,userItems } from './header-dummy-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay=false;
  selectLanguage:any;
  languages = languages;
  userItems=userItems

  collapsedsmall=false;
  collapsedsmallActive=false;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 500){
      this.collapsedsmall = true
    }else{
      this.collapsedsmall = false
      this.checkCanShowSearchAsOverlay(window.innerWidth);

    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 500){
      this.collapsedsmall = true
    }else{
      this.collapsedsmall = false
      this.checkCanShowSearchAsOverlay(window.innerWidth);
    }
    this.selectLanguage = this.languages[0];
  }


  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number){
    if(innerWidth <845){
      this.canShowSearchAsOverlay=true;
    }else{
      this.canShowSearchAsOverlay=false;
    }
  }

  toggleCollapseBars(){
    this.collapsedsmallActive = !this.collapsedsmallActive;
  }


}
