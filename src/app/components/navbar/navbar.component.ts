import { Component } from '@angular/core';

@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  menulist:any=[
    {
      title:"Home",
      route:"home"
    },
    {
      title:'About',
      route:'about'
    },
    
  ];

}
