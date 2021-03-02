import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SqlQueryComponent } from './sql-query/sql-query.component';
import { AssistedQueryComponent } from './assisted-query/assisted-query.component';
import { UploadDataComponent } from './upload-data/upload-data.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sql-query', component: SqlQueryComponent },
  { path: 'assisted-query', component: AssistedQueryComponent },
  { path: 'upload-data', component: UploadDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
