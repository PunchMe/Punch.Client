import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/index';
import { ExternalLogin } from '../shared/index';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'punch-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  providers: ExternalLogin[];
  errorMessage: string;

  constructor(private accountService: AccountService){}

  ngOnInit() {
    this.getAuthProviders();
  }

  getAuthProviders() {
    this.accountService.getAuthProviders()
                        .subscribe(
                          providers => this.providers = providers,
                          error => this.errorMessage = <any>error
                        );
  }
}
