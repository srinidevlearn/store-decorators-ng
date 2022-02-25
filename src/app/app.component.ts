import { Component } from '@angular/core';
import { XYZFacadeService } from './facades/XYZ.facade.service';
import { ABCFacadeService } from './facades/ABC.facade.service';
import { resetStore } from './store';
import { delay, from, of, take } from 'rxjs';
import { useTapEffects } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'learn-store';
  text=''
  constructor(
    public abcFacade: ABCFacadeService,
    public xyzFacade: XYZFacadeService
  ) {}

  updateData(e: any) {
    this.text = e.target.value;
    this.abcFacade.updateLists(this.text);
    this.abcFacade.updateLists2(this.text);
    
  }

  clearFields(){
    return of(true).pipe(delay(500),take(1)).subscribe(d=>{
      this.text = ''
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.xyzFacade.concept = Array(10)
        .fill(0)
        .map((i, inc) => inc);
    }, 10 * 1000);
  }

  ngOnDestroy() {}
}
