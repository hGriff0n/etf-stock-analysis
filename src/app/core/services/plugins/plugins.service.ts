import { Injectable, SystemJsNgModuleLoader, Inject } from '@angular/core';

import {readdirSync} from 'fs';
import { join } from 'path';
import { HoldingPlugin } from '../../plugins/plugin.interface';
import { RobinhoodPlugin } from '../../plugins/robinhood/plugin';
import { HttpClient } from '@angular/common/http';

// const SystemJS = new System();

const config = {
  installPath: 'C:\\Users\\ghoop\\Desktop\\holdings\\etf-stock-analysis\\src\\app\\core\\plugins',
}

// https://github.com/frankwallis/plugin-typescript
@Injectable({
  providedIn: 'root'
})
export class PluginsService {
  private loaded: { [id: string]: any } = {}

  // TODO: Should also probably require a set file in the directory
  constructor(private http: HttpClient) {
    // readdirSync(config.installPath, { withFileTypes: true })
    //   .filter(dirent => dirent.isDirectory())
    //   .forEach(dirent => this.loadPlugin(dirent.name, config.installPath))
    // this.loadPlugin('robinhood', config.installPath)
    let r = new RobinhoodPlugin(http);
    r.login();
    this.loaded['robinhood'] = r;
  }

  private loadPlugin(name: string, source: string) {
    // import(join(source, name, 'plugin')).then(plugin => this.loaded[name] = plugin)
    // this.loaded[name] = System.import(join(source, name, "plugin.ts"));
    //
    // import(join(source, name, "plugin.ts")).then(plugin => this.loaded[name] = plugin)
    // console.log("loading plugin " + name)
  }

  // TODO: Should be async
  getHoldings(): { [sybmol: string]: { [id: string]: any } } {
    let holdings = {}
    for (let plugin in this.loaded) {
      if ((this.loaded[plugin] as HoldingPlugin).getHoldings) {
        let sub_holdings = (this.loaded[plugin] as HoldingPlugin).getHoldings();
        for (let symbol in sub_holdings) {
          if (!(symbol in holdings)) {
            holdings[symbol] = { };
          }
          holdings[symbol][plugin] = sub_holdings[symbol];
        }
      }
    }
    return holdings
  }
}
