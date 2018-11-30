"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var services_1 = require("../services/services");
var pipes_1 = require("./pipes");
var app_routing_1 = require("./app.routing");
var account_info_component_1 = require("./account-info/account-info.component");
var main_component_1 = require("./main/main.component");
var stats_component_1 = require("./stats/stats.component");
var accounts_component_1 = require("./accounts/accounts.component");
var buy_tokens_component_1 = require("./buy-tokens/buy-tokens.component");
var compose_component_1 = require("./compose/compose.component");
var vote_component_1 = require("./vote/vote.component");
var delegate_component_1 = require("./delegate/delegate.component");
var radio_input_component_1 = require("./radio-input/radio-input.component");
var Pipes = [pipes_1.ToUTF8, pipes_1.FromWei];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                account_info_component_1.AccountInfoComponent,
                main_component_1.MainComponent,
                stats_component_1.StatsComponent,
                accounts_component_1.AccountsComponent,
                buy_tokens_component_1.BuyTokensComponent,
                compose_component_1.ComposeComponent,
                vote_component_1.VoteComponent,
                delegate_component_1.DelegateComponent,
                radio_input_component_1.RadioInputComponent,
                Pipes
            ],
            providers: [
                services_1.Web3Service,
                services_1.VotingService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map