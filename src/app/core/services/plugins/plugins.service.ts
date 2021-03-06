import { Injectable, SystemJsNgModuleLoader, Inject } from '@angular/core';

import { HoldingPlugin } from '../../plugins/plugin.interface';
import { RobinhoodPlugin } from '../../plugins/robinhood/plugin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
Generalized component system to allow for the runtime importing of various plugins, allowing
  for modular customization and linkage of brokerages and other information sources.

Unfortunately I haven't figured out yet how to actually perform a runtime import so the
  system is hardcoded for now
*/

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

  // TODO: Should accomodate many holding plugins
  // TODO: Should cache information, somehow
  getHoldings(): Observable<Record<string, any>> {
    return (this.loaded['robinhood'] as HoldingPlugin).getHoldings().pipe(map(data => {
      let holdings = {};
      for (let symbol in data) {
        if (!(symbol in holdings)) {
          holdings[symbol] = {};
        }
        holdings[symbol]['robinhood'] = data[symbol];
      }
      return holdings;
    }));
  }
}
