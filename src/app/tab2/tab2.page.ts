import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, scan,tap } from 'rxjs/operators';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonModal) modal: IonModal;
  productList = [];
  index = 0;
  end = 10
  page$ = new BehaviorSubject({ start: this.index, end: this.end });
  product = this.page$.pipe(
    concatMap(({ start, end }) => this.getData(start, end)),
    tap(data=>console.log(data)),
    scan((acc: any[], items: any[]) => [...items])
  );

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

  }
  getData(start, end) {
    return new Observable(sub => {
      this.http.get('/assets/product.json').subscribe(data => {
        let array = [];
        for (start; start <= end; start++) {
          array.push(data[start]);
        }
        sub.next(array);
        this.index, this.end += 10;
        sub.complete();
      })
    });
  }
  loadData($event) {
    this.page$.next({ start: this.index, end: this.end });
    $event.target.complete();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('123', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
}
