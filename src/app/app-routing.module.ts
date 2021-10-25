import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from "./components/home-page/home.component";
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomeComponent},
    ]
  },
  {
    path: 'admin', loadChildren:  () => import('./admin/admin.module').then(m => m.AdminModule)
    //path: 'admin', loadChildren: './admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
