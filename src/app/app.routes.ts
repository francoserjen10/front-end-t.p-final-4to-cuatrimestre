import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AppleIncComponent } from './routes/apple/apple-inc.component';
import { TeslaIncComponent } from './routes/tesla/tesla-inc.component';
import { JpMorganChaseComponent } from './routes/jp-morgan-chase/jp-morgan-chase.component';
import { RocheHoldingAgComponent } from './routes/roche-holding-ag/roche-holding-ag.component';
import { ShellPlcComponent } from './routes/shell/shell-plc.component';
import { VisaIncComponent } from './routes/visa/visa-inc.component';
import { WalmartIncComponent } from './routes/walmart/walmart-inc.component';

export const routes: Routes = [
    // Home
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // Apple
    { path: 'apple-Inc', title: 'Apple Inc', component: AppleIncComponent },
    // Tesla
    { path: 'tesla-Inc', title: 'Tesla Inc', component: TeslaIncComponent },
    // JPMorga Chase & Co
    { path: 'jp-morgan-chase-&-co', title: 'JPMorgan Chase & Co', component: JpMorganChaseComponent },
    // Roche Holding AG
    { path: 'roche-holding-ag', title: 'Roche Holding AG', component: RocheHoldingAgComponent },
    // Shell 
    { path: 'shel-plc', title: 'Shell PLC', component: ShellPlcComponent },
    // Visa
    { path: 'visa-inc', title: 'Visa Inc', component: VisaIncComponent },
    // Walmart
    { path: 'walmart-inc', title: 'Walmart Inc', component: WalmartIncComponent },

];
