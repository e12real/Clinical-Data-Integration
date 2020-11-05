import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { LoginComponent } from './login/login.component';
import { SqlQueryComponent } from './sql-query/sql-query.component';
import { AssistedQueryComponent } from './assisted-query/assisted-query.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavListComponent,
    LoginComponent,
    SqlQueryComponent,
    AssistedQueryComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
