import { Component } from '@angular/core';
import { XYZRepositoryService } from './repositories/XYZ.repository.service';
import { ABCRepositoryService } from './repositories/ABC.repository.service';
import { resetStore } from './store';
import { from } from 'rxjs';
import { useTapEffects } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learn-store';
  constructor(public abcRepo:ABCRepositoryService,public xyzRepo:XYZRepositoryService){
  
  }

  updateData(e:any){
    this.abcRepo.updateLists(e.target.value)
    this.abcRepo.updateLists2(e.target.value)

  }
  
  ngOnInit(){

      setTimeout(() => {
        this.abcRepo.concept = [1,2,4]
      }, 3000);
  }


  ngOnDestroy(){
  }



  
}
