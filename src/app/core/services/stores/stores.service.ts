import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/shared/models/stores/store';
import { StoresRepositoryService } from '../../repositories/stores/stores-repository.service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private storesRepository: StoresRepositoryService) { }

  getStores(): Observable<IStore[]> {
    return this.storesRepository.getStores();
  }
}
