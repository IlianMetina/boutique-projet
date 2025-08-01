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
import { AccountComponent } from './account-component/account-component';
import { OrdersComponent } from './orders-component/orders-component';
import { AccountInfosComponent } from './account-infos-component/account-infos-component';
import { ProductComponent } from './product-component/product-component';
import { LivraisonComponent } from './livraison-component/livraison-component';
import { SuccessComponent } from './success-component/success-component';
import { CancelComponent } from './cancel-component/cancel-component';

export const routes: Routes = [

  { path: '', component:HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'a-propos', component: AboutComponent },
  { path: 'mobilier', component: MeublesComponent },
  { path: 'accessoires', component: AccessoiresComponent },
  { path: 'rangements', component: RangementsComponent },
  { path: 'sieges-fauteuils', component: SiegesComponent },
  { path: 'tech', component: GadgetsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'produits/:id', component: ProductComponent },
  { path: 'mon-compte', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'mon-compte/mes-commandes', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'mon-compte/mes-infos', component: AccountInfosComponent, canActivate: [AuthGuard] },
  { path: 'panier/livraison', component: LivraisonComponent, canActivate: [AuthGuard] },
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
  { path: 'cancel', component: CancelComponent, canActivate: [AuthGuard] },

  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];
