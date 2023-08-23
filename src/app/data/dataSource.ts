import { Observable, tap } from "rxjs";
import { Order, Product } from "./entities";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export type ProductProp = keyof Product;

export abstract class DataSourceImplement {
  abstract loadProducts$(): Observable<Product[]>;
  abstract storeOrder$(order: Order): Observable<number>;

  constructor(private http: HttpClient) {

  }

  getDataTest() {
    this.http.get<Product[]>('http://localhost:4600/products').subscribe(console.log)
  }

}

@Injectable()
export class DataSource {
  private products: Product[];
  private categories: Set<string>;
  order: Order;

  constructor(private implement: DataSourceImplement) {
    this.products = [];
    this.categories = new Set<string>();
    this.order = new Order();
    this.getData();
  }

  gettest() {
    this.implement.getDataTest();
  }

  getProducts(sortProp: ProductProp = 'id', category?: string): Product[] {
    return this.selectProducts(this.products, sortProp, category);
  }

  protected getData(): void {
    this.products = [];
    this.categories.clear();
    this.implement.loadProducts$().pipe(
      tap(rawData => {
        for (const data of rawData) {
          this.products.push(data);
          this.categories.add(data.category)
        }
      })
    ).subscribe();
  }

  protected selectProducts(prodList: Product[], sortProp: ProductProp, category?: string): Product[] {
    return prodList
      .filter(p => category === undefined || p.category === category)
      .sort((p1, p2) => p1[sortProp] < p2[sortProp]
        ? -1
        : p1[sortProp] > p2[sortProp] ? 1 : 0)
  }

  getCategories(): string[] {
    return [...this.categories.values()];
  }

  storeOrder$(): Observable<number> {
    return this.implement.storeOrder$(this.order)
  }
}