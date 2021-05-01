import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeGuard } from './guards/welcome.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'welcome-screen',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    //canActivate: [WelcomeGuard]
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [AuthGuard]
  },
 // {
    //path: '**',
    //loadChildren: () => import('./page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
 // },
  {
    path: 'pmeeting',
    loadChildren: () => import('./pmeeting/pmeeting.module').then( m => m.PmeetingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profcreate',
    loadChildren: () => import('./profcreate/profcreate.module').then( m => m.ProfcreatePageModule)
  },
  {
    path: 'pform/:id',
    loadChildren: () => import('./pform/pform.module').then( m => m.PformPageModule)
  },
  {
    path: 'viewmeeting',
    loadChildren: () => import('./viewmeeting/viewmeeting.module').then( m => m.ViewmeetingPageModule)
  },
  {
    path: 'viewcal/:id',
    loadChildren: () => import('./viewcal/viewcal.module').then( m => m.ViewcalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pformview/:id',
    loadChildren: () => import('./pformview/pformview.module').then( m => m.PformviewPageModule)
  },
  {
    path: 'viewstudentmeeting',
    loadChildren: () => import('./viewstudentmeeting/viewstudentmeeting.module').then( m => m.ViewstudentmeetingPageModule)
  },
  {
    path: 'tutorcreate',
    loadChildren: () => import('./tutorcreate/tutorcreate.module').then( m => m.TutorcreatePageModule)
  },
  {
    path: 'stulist/:id',
    loadChildren: () => import('./stulist/stulist.module').then( m => m.StulistPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'newcal/:id',
    loadChildren: () => import('./newcal/newcal.module').then( m => m.NewcalPageModule)
  },
  {
    path: 'tmeeting',
    loadChildren: () => import('./tmeeting/tmeeting.module').then( m => m.TmeetingPageModule)
  },
  {
    path: 'tform/:id',
    loadChildren: () => import('./tform/tform.module').then( m => m.TformPageModule)
  },
  {
    path: 'viewtutmeeting',
    loadChildren: () => import('./viewtutmeeting/viewtutmeeting.module').then( m => m.ViewtutmeetingPageModule)
  },
  {
    path: 'tformview/:id',
    loadChildren: () => import('./tformview/tformview.module').then( m => m.TformviewPageModule)
  },
  {
    path: 'viewschedtutmeeting',
    loadChildren: () => import('./viewschedtutmeeting/viewschedtutmeeting.module').then( m => m.ViewschedtutmeetingPageModule)
  },
  {
    path: 'welcome-screen',
    loadChildren: () => import('./welcome-screen/welcome-screen.module').then( m => m.WelcomeScreenPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
