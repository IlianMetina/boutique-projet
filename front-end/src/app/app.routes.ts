import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { AboutComponent } from './about-component/about-component';
import { MeublesComponent } from './meubles-component/meubles-component';
import { AccessoiresComponent } from './accessoires-component/accessoires-component';
import { RangementsComponent } from './rangements-component/rangements-component';
import { GadgetsComponent } from './gadgets-component/gadgets-component';
import { TablesComponent } from './tables-component/tables-component';
import { SiegesComponent } from './sieges-component/sieges-component';

export const routes: Routes = [

  { path: '', component:HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'a-propos', component: AboutComponent },
  { path: 'mobilier', component: MeublesComponent },
  { path: 'accessoires', component: AccessoiresComponent },
  { path: 'rangements', component: RangementsComponent },
  { path: 'tech', component: GadgetsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'sieges-fauteuils', component: SiegesComponent },
  // { path: 'admin', component: AdminComponent}
];
