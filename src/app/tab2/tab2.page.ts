import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, scan, tap } from 'rxjs/operators';
import { IonModal } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  cart = [];
  page$ = new BehaviorSubject({ start: this.index, end: this.end });
  boolMenu = false;
  product = this.page$.pipe(
    concatMap(({ start, end }) => this.getData(start, end)),
    tap(data => console.log(data)),
    scan((acc: any[], items: any[]) => [...items])
  );

  constructor(
    public toastController: ToastController,
    private http: HttpClient,
    private menu: MenuController
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

  async buyNow(product) {
    this.cart.push(product);
    const toast = await this.toastController.create({
      message: 'Successfully Added',
      duration: 2000,
      color: 'primary',
      icon: 'checkmark-outline',
      mode: 'ios'
    });
    toast.present();
  }

  openMenu() {
    this.boolMenu ? this.menu.close('end') : this.menu.open('end');
    this.boolMenu = !this.boolMenu;
  }

  removeCartProduct(index) {
    console.log(index);
    this.cart.splice(index, 1);
  }

  productById(index, product) {
    return product.id;
}
}
