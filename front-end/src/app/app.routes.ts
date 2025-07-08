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
import { AuthGuard } from './services/auth/auth-guard';
import { LikeComponent } from './like-component/like-component';
import { PanierComponent } from './panier-component/panier-component';

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
  { path: 'mes-envies', component: LikeComponent, canActivate: [AuthGuard] },
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  // { path: 'mon-compte', component: AccountComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'mes-commandes', component: CommandesComponent, canActivate: [AuthGuard] },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },

  

];
