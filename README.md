### წამიკითხე!

მას შემდეგ რაც კოდს დაკლონავ/ჩამოწერ, პროექტი გახსენი ედიტორში და გაუშვი ბრძანება:

```shell
npm install
```

ეს ჩამოწერს პროექტისთვის საჭირო ყველა პაკეტს, რომელიც საჭიროა დეველოპმენტისთვის (და სერვერის წარმატებით გასაშვებად).

გაკვეთილი:

# Angular & REST API: როგორ დავუკავშიროთ ანგულარი ბექენდს?

## სარჩევი

- [Angular & REST API: როგორ დავუკავშიროთ ანგულარი ბექენდს?](#angular--rest-api-როგორ-დავუკავშიროთ-ანგულარი-ბექენდს)
  - [სარჩევი](#სარჩევი)
  - [REST API](#rest-api)
  - [რა არის RxJS?](#რა-არის-rxjs)
- [დავიწყოთ!](#დავიწყოთ)
  - [გავამზადოთ firebase და ფრონტენდი](#გავამზადოთ-firebase-და-ფრონტენდი)
  - [გავგზავნოთ POST მოთხოვნა](#გავგზავნოთ-post-მოთხოვნა)
  - [გავგზავნოთ GET მოთხოვნა](#გავგზავნოთ-get-მოთხოვნა)
  - [რეაქტიულობა](#რეაქტიულობა)
  - [გავგზავნოთ DELETE მოთხოვნა](#გავგზავნოთ-delete-მოთხოვნა)
  - [გავგზავნოთ PATCH მოთხოვნა](#გავგზავნოთ-patch-მოთხოვნა)
  - [Subscription-ის თავისებურება](#subscription-ის-თავისებურება)
- [საკითხავი მასალა](#საკითხავი-მასალა)

ხშირ შემთხვევაში ფრონტენდ აპლიკაცია პროექტის მხოლოდ ნახევარია და საჭიროა სერვერი და მონაცემების ბაზა,
რათა სრულფასოვანი ვებ აპლიკაცია შევქმნათ. ამ გაკვეთილში ვისწავლით, როგორ დავაკავშიროთ ჩვენი ფრონტენდ
Angular აპლიკაცია REST API-სთან.

ჩვენ გამოვიყენებთ შემდეგ ტექნოლოგიებს:

- Angular - ფრონტ ენდ აპლიკაციისთვის
- Firebase - ბექენდისთვის (მონაცემთა ბაზა და API)
- RxJS - ასინქრონული კოდისთვის.

## REST API

REST API არის ინტერფეისი რომელიც მიყვება REST-ის არქიტექტურულ სტილს. მარტივად ეს არქიტექტურული სტილი იმით ხასიათდება, რომ API-სა და კლიენტებს შორის მონაცემების მიმოცვლა ხდება ცალკეული, ურთიერთდამოუკიდებელი HTTP მოთხოვნებით, სადაც კომუნიკაცია არის state-ის გარეშე. ანუ კლიენტის ინფორმაცია არ ინახება მოთხოვნებს შორის.

HTTP-ის საშუალებით შესაძლებელია REST API-სთვის სხვადასხვა ტიპის მოთხოვნების გაგზავნა:

- GET - მონაცემების მიღება
- POST - ახალი ინფორმაციის ატვირთვა
- DELETE - არსებული ინფორმაციის ამოშლა
- PATCH - არსებული მონაცემების მოდიფიკაცია

... და სხვა.

ბექენდისთვის ჩვენ Firebase-ის SDK-ის არ გამოვიყენებთ, სანაცვლოდ ვიხელმძღვანელებთ მისი REST API თვისებებით. ასე ვისწავლით ზოგადად REST API-ის გამოყენებას ფრონტენდზე და არა უბრალოდ Firebase-ის თავისებურებებს. შეგიძლიათ ნახოთ [დეტალური დოკუმენტაცია](https://firebase.google.com/docs/reference/rest/database) იმის თაობაზე, როგორ გამოიყენოთ firebase, როგორც REST API.

## რა არის RxJS?

RxJS არის Angular-ში ინტეგრირებული ბიბლიოთეკა, რომელიც შედგება ასინქრონული და ივენთებზე დაფუძნებული პროგრამებისგან, რომლებიც გამოიყენება დაკვირვებადი (Observable) ნაკადით. იგი საშუალებას გვაძლევს რომ ასინქრონულ მოვლენებს მოვეპყროთ, როგორც კოლექციებს.

თუ ჩვენთვის ჩვეულ ჯავასცკრიპტში ჩვენ ივენთებს ასე ვუსმენთ:

```js
document.addEventListener("click", () => console.log("Clicked!"));
```

RxJS-ში ჩვენ სანაცვლოდ ვქმნით Observable-ს.

```js
import { fromEvent } from "rxjs";

fromEvent(document, "click").subscribe(() => console.log("Clicked!"));
```

რაც მთავარია, RxJS გვთავაზობს მთელ რიგ ოპერატორებს, რომელთა საშუალებითაც შეგვიძლია ასინქრონულ მოვლენებს ეტაპობრივად გავუკეთოთ მანიპულაცია.

```js
import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`Clicked ${count} times`));
```

აქ scan ოპერატორი მუშაობს ისე, როგორც reduce მეთოდი array-ში. ის იღებს იმ მონაცემს, რომელიც ქოლბექ ფუნქციაში მოგვეცემა მაშინ, როცა ივენთი დაფიქსირდება. ქოლბექის მიერ დაბრუნებული მონაცემი შემდგომი ქოლბექებისთვის ხდება ხელმისაწვდომი. RxJS-ს შეგიძლიათ დეტალურად გაეცნოთ [ოფიციალურ დოკუმენტაციაში](https://rxjs.dev/guide/overview)

# დავიწყოთ!

## გავამზადოთ firebase და ფრონტენდი

ჩვენ გვაქვს წინასწარ გამზადებული გასაკეთებელი საქმეების აპლიკაცია ([გადმოწერეთ საწყისი კოდი აქედან](https://github.com/CondensedMilk7/ng-lesson-todo/tree/firebase-starter)), რომელიც მონაცემების შესანახად ლოკალურ მეხსიერებას იყენებს. დროა ლოკალური მეხსიერება მონაცემთა ბაზით ჩავანაცვლოთ!

თუ გსურთ ამ აპლიკაციის ნულიდან აწყობა, შეგიძლიათ მიყვეთ ჩემ [ვიდეო გაკვეთილებს](https://www.youtube.com/playlist?list=PLvlLyfXTKx9Wb6f2Tzu4UPSnXsQOUnsKr)

უპირველეს ყოვლისა შევიდეთ [firebase-ზე](https://firebase.google.com/), შევქმნათ ექაუნთი (თუ არ გვაქვს) და გადავინაცვლოთ კონსოლზე (Go to console). აქ შეგვიძლია შევქმნათ ახალი პროექტი. ჩვენი პოროექტის გვერდზე ვერტიკალური მენიუდან გადავინაცვლოთ realtime database-ზე და შევქმნათ ბაზა სატესტო რეჟიმში. სატესტო რეჟიმი გულისხმობს, რომ გარკვეული პერიოდი ნებისმიერ ადამიანს, ვისაც წვდომა აქვს ჩვენს ენდფოინთზე, შეუძლია მონაცემების აღება და ჩაწერა. ჩვენ უნდა ვხედავდეთ ცარიელ მონაცემთა ბაზას და აქვე უნდა მოცემული გვქონდეს ჩვენი API-ს URL რომელიც შეგვიძლია დავაკოპიროთ და ჩვენს ფრონტენდში შევინახოთ.

environments/environment.ts

```ts
export const environment = {
  production: false,
  baseUrl: "https://firebase-api-url/",
};
```

> **შენიშვნა:** environment.ts გამოიყენება დეველოპმენტის დროს კონფიგურაციების შესანახად, ხოლო environment.prod.ts უკვე იმ ეტაპზე, როცა აპლიკაცია მზადაა რეალურ სამყაროში გასაშვებად.

ახლა გადავინაცვლოთ ჩვენი სერვისის ფაილში და შემოვიტანოთ ეს ლინკი, როგორც ცვლადი.

```ts
// imports ...

@Injectable({ providedIn: 'root' })
export class ItemsService {
  baseUrl = environment.baseUrl;

  // other code ...
```

რათა განვახორციელოთ HTTP მოთხოვნები, საჭიროა სათანადო მოდულის დაიმპორტება ჩვენს app.module.ts-ში.

```ts
// other imports ...
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    /* ... */
  ],
  imports: [/* ... */ HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

ახლა შეგვიძლია ჩვენს სერვისში დავაინჯექთოთ HttpClient, რომელიც წვდომას მოგვცემს ჩვენთვის საჭირო ფუნქციებზე.

app/items.service.ts

```ts
// other imports ...
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ItemsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // other code ...
}
```

## გავგზავნოთ POST მოთხოვნა

შევინახოთ ახალი ნივთი მონაცემთა ბაზაში. ამისათვის, ჩვენს სერვისში `addItem` მეთოდის შიგნით არსებული ლოგიკა ჩავანაცვლოთ შემდეგით:

app/items.service.ts

```ts
addItem(newItemDesc: string) {
    const newItem = {
      description: newItemDesc,
      done: false,
    };
    this.http.post(`${this.baseUrl}todos.json`, newItem).subscribe(
        (response) => {
            console.log(response)
        }
    );
}
```

ჩვენ შევქმენით ახალი ნივთი აღწერის მიხედვით, და გამოვიყენეთ `post` მეთოდი, სადაც პირველ არგუმენტად განვათავსეთ API-ს URL-ი, რომელსაც ბოლოში ვუმატებთ იმ ველის სახელს (.`json`-ით დაბოლოოებულს, როგორც ამას firebase მოითხოვს), რომლის ქვეშაც გვინდა, რომ განთავსდეს ჩვენი მონაცემები. მეორე არგუმენტად განვათავსებთ ახალ ნივთს. http მეთოდები აბრუნებენ Observable-ს, ანუ ასინქრონულ მოვლენას, რომელსაც უნდა მოვუსმინოთ `subscribe()`-ს საშუალებით, სხვა შემთხვევაში ანგულარი მოთხოვნას არ გაგზავნის! აქ ჩვენ ქოლბექ ფუნქციით დავლოგოთ ის, რასაც სერვერი დაგვიბრუნებს საპასუხოდ.

თუ ჩვენს აპლიკაციაში შევიყვანთ რამე ტექსტს, და დამატების ღილაკს დავაჭერთ, სერვერმა საპასუხოდ რაღაც ასეთი უნდა დაგვიბრუნოს:

```ts
{
  name: "~Mwn8l3jaf38h";
}
```

შევხედოთ ჩვენი firebase-ის მონაცემთა ბაზას. ჩვენ უნდა ვხედავდეთ ახალ ველს `todos`, რომლის შიგნითაც არის ობიექტი სახელად `"~Mwn8l3jaf38h"` და მისი მნიშვნელობა არის ის ნივთი, რომელიც ჩვენმა აპლიკაციამ შექმნა. ეს უცნაური სტრინგი არის ჩვენი ახალი ნივთის ერთგვარი ID ან key. ამ მონაცემთა ბაზაში array-ის ფორმით არაფერი ინახება.

ახლა ვცადოთ ჩვენი ნივთები დავიბრუნოთ ბაზიდან, ხოლო შემდგომ ვიზრუნოთ იმაზე, რომ ახალი ნივთის დამატებისას მაშინვე დავინახოთ ფრონტენდზე შედეგი.

## გავგზავნოთ GET მოთხოვნა

რამდენიმეჯერ კიდევ შევქმნათ ახალი ნივთი, რათა ბაზაში გვქონდეს ერთზე მეტი გასაკეთებელი საქმე. ბაზაში ვხედავთ, რომ გვაქვს todos ობიექტი ბევრი უნიკალური ფროფერთით. ამის გამო მოგვიწევს, რომ განვაახლოთ ჩვენი ნივთის მოდელი და დავამატოთ ახალი ფროფერთი, `key`, რომელშიც შეინახება ყოველი ნივთის key:

app/item.model.ts

```ts
export interface Item {
  description: string;
  done: boolean;
  key: string;
}
```

ინტერფეისის განახლებისას ტაიპსკრიპტი ერორებს გვიჩვენებს. სერვისში დავაცარიელოთ `getItems`, `deleteItem` და `finishItem` მეთოდები, რათა ერორებს თავი დავაღწიოთ. ამ მეთოთების განახლება მაინც მალე მოგვიწევს.

განვაახლოთ ჩვენი `getItems` მეთოდი სერვისში.

app/items.service.ts

```ts
import { map, Observable } from 'rxjs';
// ... other code
  getItems(): Observable<Item[]> {
    return this.http.get(this.baseUrl + this.targetData).pipe(
      map((response) => {
        if (response) {
          const todoArray = [];
          for (let key in response) {
            todoArray.push({ ...response[key], key: key });
          }
          return todoArray;
        } else {
          return [];
        }
      }),
    );
  }
```

ჩვენ ვიყენებთ map ოპერატორს RxJS-დან, რომლითაც შეგვიძლია მიღებულ მონაცემებს მოდიფიკაცია გავუკეთოთ და ახლებური ფორმით დავაბრუნოთ, სანამ subscribe-ს გავაკეთებთ. ვინაიდან ჩვენ გვაქვს ობიექტი უნიკალური ფროფერთიებით, for of loop არ არ ივარგებს. ამიტომ, გამოვიყენოთ for in loop, რომლითაც ობიექტის თითოეული ფროფერთის სახელს ჩავწვდებით და ამის მიხედვით შევქმნათ array სადაც განვათავსებთ ნივთებს ჩვენი მოდელის მიხედვით. ნივთის `description` და `done` ფროფერთიები ყოველ ობიექტში არის უკვე მოცემული, ჩვენ უბრალუდ უნდა დავსპრედოთ (spread operation) ისინი და ამასთანავე დავამატოთ ახალი ფროფერთი `key`. საბოლოოდ შეგვიძლია უკვე დავაბრუნოთ ეს სია. თუ todos ბაზაში ცარიელია, მაშინ დავაბრუნოთ ცარიელი სია. თუ დააკვირდებით, აქ ჩვენ არ ვასუბსქრაიბებთ, მხოლოდ ვაბრუნებთ რექვესთს, რადგან შედეგი, რომელსაც მივიღებთ ამ რექვესთისგან გვჭირდება app.component.ts-ში. სწორედ იქ გამოვიყენებთ `subscribe`-ს.

app/app.component.ts

```ts
// ... other code
export class AppComponent implements OnInit, OnDestroy {
  items: Item[];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
    });
  }
}
```

აპლიკაცია ინიციალიზაციის დროს გაგზავნის GET მოთხოვნას და საპასუხოდ მიიღებს გასაკეთებელ საქმეებს, რომლებსაც მოდიფიკაციების შემდგომ განვათავსებთ თემფლეითში. თუ ჩვენ აპლიკაციას შევხედავთ ახალი ნივთების სია უნდა დაგვხვდეს.

## რეაქტიულობა

ახლა შეგვიძლია დავუბრუნდეთ `addItem` მეთოდს. ჩვენ გვინდა, რომ ახალი ნივთის დამატებისას სიაც განახლდეს. ამისათვის სერვისში შევქმნით Subject-ს. ეს არის ერთგვარი Observable რომელსაც შეგვიძლია მოვუსმინოთ, როგორც ივენთს, `subscribe`-ის საშუალებით. თუკი ამ შექმნილ Subject-ზე დავუძახებთ next მეთოდს, იგი დააემითებს ჩვენთვის სასურველ ინფორმაციას, როგორც ივენთს. Subject-ს, ისევე როგორც Observable-ებს კონვენციურად სახელის ბოლოში $-ს უწერენ. აქვე ჩვენ მივუთითებთ, რომ ეს Subject დაგვიბრუნებს `Item`-ების სიას. ჩვენ შემდეგ შეგვიძლია განახლებული სია დავაემითოთ და მას მოვუსმინოთ app.component.ts-იდან, მაგრამ ჯერ სერვისის ლოგიკას მივხედოთ.

app/items.service.ts

```ts
import { map, Observable, tap, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ItemsService {
  baseUrl = environment.baseUrl;
  items: Item[] = [];

  itemsUpdated$ = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  // other code ...

  addItem(newItemDesc: string) {
    const newItem = {
      description: newItemDesc,
      done: false,
    };
    this.http
      .post<{ name: string }>(this.baseUrl + this.targetData, newItem)
      .pipe(
        tap((response: { name: string }) => {
          if (response) {
            this.items.push({ ...newItem, key: response.name });
            this.itemsUpdated$.next(this.items);
          }
        })
      )
      .subscribe();
  }

  // other code ...
}
```

tap ოპერატორი საშუალებას გვაძლეს, რომ განვახორციელოთ ლოგიკა მონაცემების საბოლოო ფორმის შეცვლის გარეშე. მართლაც, დაბრუნებული პასუხი იგივე იქნება, როგორც აქამდე, უბრალოდ შუალედში ჩვენ შევქმნით ახალი ნივთის ობიექტს, რომელიც მონაცემთა ბაზაში უკვე დაფიქსირდა და რომლის საპასუხოდაც მისი უნიკალური key მივიღეთ, ამ key-საც ახალ ობიექტში განვათავსებთ. შემდგომ ამ ახალ ნივთს დავამატებთ უკვე სერვისში შექმნილი ნივთების სიაში და ამ მთელ სიას დავაემითებთ.

შენიშვნა: აუცილებელია, რომ როცა ნივთებს მივიღებთ GET მოთხოვნიდან, შევინახოთ ამ სერვისის items-ში. ამიტომ ჩვენი getItems ახლა ასე გამოიყურება:

```ts
  getItems(): Observable<Item[]> {
    return this.http.get(this.baseUrl + this.targetData).pipe(
      map((response) => {
        if (response) {
          const todoArray = [];
          for (let key in response) {
            todoArray.push({ ...response[key], key: key });
          }
          return todoArray;
        } else {
          return this.items;
        }
      }),
      tap((items) => {
        this.items = items;
      })
    );
  }
```

დავუბრუნდეთ app.component.ts-ს და `subscribe` გავაკეთოთ ჩვენს ახალ Subject-ზე.

```ts
// ... other code
export class AppComponent implements OnInit, OnDestroy {
  items: Item[];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
    });

    this.itemsService.itemsUpdated$.subscribe((items) => {
      this.items = items;
    });
  }
}
```

როცა ჩვენ სერვისიდან განახლებულ ნივთებს დავაემითებთ subject-ით, ის აქაც განახლდება.
ახლა, ახალი ნივთების დამატებისას, სიაც უნდა განახლდეს.

## გავგზავნოთ DELETE მოთხოვნა

firebase-ზე წაშლის მოთხოვნა იგზავნება URL-ში იმის დაზუსტებით, თუ ბაზაში მონაცემების რა ნაწილის წაშლა გვსურს. ჩვენ შემთხვევაში ესაა ობიექტი კონკრეტული Key-ით, რომელიც განთავსებულია todos ობიექტში.
შესაბამისად ჩვენი მოთხოვნის ლინკი იქნება რაღაც ასეთი: `'https://<firebase-url>/todos/<key>.json'`.

app/items.service.ts

```ts
  deleteItem(key: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}todos/${key}.json`).pipe(
      tap(() => {
        const itemIndex = this.items.map((item) => item.key).indexOf(key);
        this.items.splice(itemIndex, 1);
        this.itemsUpdated$.next(this.items);
      })
    );
  }
```

firebase წარმატებული წაშლის საპასუხოდ `null`-ს გვიბრუნებს, ამიტომ მისი ტიპიც შესაბამისად აღვწერეთ. წაშლის მეთოდის არგუმენტად უნდა მივიღოთ ნივთის `key` და სწორედ ამას გამოვიყენებთ მოთხოვნის URL-ის ასაგებად. შემდეგ, წარმატებული წაშლის შედეგად ჩვენი ნივთების სიაში ვიპოვით წაშლილი ნივთის ინდექსს და მას ამოვშლით, განახლებულ სიას კი დავაემითებთ, რათა ის თემფლეითშიც განახლდეს.

item.component.ts-დან საჭიროა რომ სწორი არგუმენტი გავატაროთ წაშლის მეთოდში და, რა თქმა უნდა, subscribe:

```ts
// imports ...
//@Component...
export class ItemComponent {
  @Input() item: Item;

  constructor(private itemsService: ItemsService) {}

  onDeleteItem() {
    this.itemsService.deleteItem(this.item.key).subscribe();
  }

  // other code ...
}
```

შევამოწმოთ აპლიკაცია. წაშლის ღილაკზე დაჭერისას ჩვენი ლოკალური სიაც უნდა შეიცვალოს და მონაცემთა ბაზაც.

ჩვენ აპლიკაციას ერთი ბოლო მეთოდიღა სჭირდება.

## გავგზავნოთ PATCH მოთხოვნა

დაგვრჩა ნივთების გადახაზვა. აქაც იმავე პრინციპით ვაგზავნით მოთხოვნას. `finishItem`-ს გადავარქვათ სახელი `updateItem`, შინაარსობრივად ეს უკეთ შეესაბამება.

```ts
  updateItem(item: Item) {
    return this.http
      .patch<{ description: string; done: boolean }>(
        `${this.baseUrl}todos/${item.key}.json`,
        {
          description: item.description,
          done: item.done,
        }
      )
      .pipe(
        tap(() => {
          const itemIndex = this.items
            .map((item) => item.key)
            .indexOf(item.key);
          this.items[itemIndex] = item;
          this.itemsUpdated$.next(this.items);
        })
      );
  }
```

არგუმენტად მივიღოთ მთლიანი ნივთი, რომლის `description`-სა და `done`-საც ახალი ობიექტის სახით გადავაგზავნით URL-ზე, სადაც ამ ნივთის key არის მითითებული.
პასუხის მიღების შემდეგ ჩვენთან ლოკალურად განვაახლოთ სია და დავაემითოთ.

item.component.ts-ში ჩვენ ახლა ამ მეთოდს უნდა დავუძახოთ, როცა ნივთს გადავხაზავთ.

```ts
// imports...
//@Component...
export class ItemComponent {
  // other code...

  onItemDone() {
    this.itemsService
      .updateItem({ ...this.item, done: !this.item.done }) // done --> !done
      .subscribe();
  }
}
```

აქ ნივთის done ფროფერთი საპირისპირო მნიშვნელობით უნდა გადავცეთ.

ახლა ჩვენს აპლიკაციაში ბექენდი სრულიად ინტეგრირებულია!

## Subscription-ის თავისებურება

ჩვენ აპლიკაციაში ბევრჯერ გამოვიყენეთ `subscribe` მეთოდი. იგი მოვლენათა ნაკადში ცვლილებებს უსმენს. აუცილებელია, რომ ასეთი მეთოდებს სიფრთხილით მოვეპყროთ, რადგან ისინი ხშირად memory leak-ს იწვევენ.
ეს ხშირად მაშინ ხდება, როცა კომპონენტები ხელახლა ინიციალიზდებიან, იძახებენ `subscribe` მეთოდს, მაგრამ ეს მეთოდები კომპონენტების განადგურებისას არ ითიშება და გროვდება.
ამიტომ ხშირად საჭიროა, რომ კომპონენტის განადგურებისას ჩვენ შევწყვიტოთ ცვლილებების მოსმენა. ამისათვის საჭიროა, რომ შევქმნათ Subscription-ის ახალი ინსტანცია, და მასში შევინახოთ დაძახებული ფუნქცია. შემდეგ კომპონენტის კლასში შემოვიტანოთ `ngOnDestroy` ციკლის hook-ი და მანდ Subscription-ზე დავუძახოთ `unsubscribe` მეთოდს.

```ts
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
// other imports ...

//@Component...
//                                OnDestroy-ს იმპლემენირება
export class AppComponent implements OnInit, OnDestroy {
  items: Item[];

  // ახალი ინსტანციის შექმნა
  itemsUpdated$ = new Subscription();

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
    });

    // ინსტანციაში შენახვა
    this.itemsUpdated$ = this.itemsService.itemsUpdated$.subscribe((items) => {
      this.items = items;
    });
  }
  // კომპონენტის განადგურებისას მოსმენის შეწყვეტა
  ngOnDestroy(): void {
    this.itemsUpdated$.unsubscribe();
  }
}
```

აქვე გაჩნდება კითხვა, რა მოვუხერხოთ http მეთდებზე დაძახებულ `subscribe`-ს? საბედნიეროდ ანგულარის HttpClient-ი `unsubscribe`-ს ჩვენ მაგივრად აგვარებს!
ასერომ, ჩვენი აპლიკაცია ბექენდთან დავაკავშირეთ და მისი ოპტიმიზაციაც შევძელით.

# საკითხავი მასალა

დეტალური ინფორმაციისათვის გაეცანით დოკუმენტაციებს:

- [Angular HTTP](https://angular.io/guide/http)
- [Angular Observables](https://angular.io/guide/observables)
- [RxJS](https://rxjs.dev/guide/overview)
- [Firebase REST API](https://firebase.google.com/docs/reference/rest/database)
