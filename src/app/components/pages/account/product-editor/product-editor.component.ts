import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Product} from "../../../../core/models/product.model";
import {ProductService} from "../../../../core/services/product.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../core/services/category.service";
import {Category} from "../../../../core/models/category.model";
import {PagedRequest} from "../../../../core/models/pageRequest/pagedRequest.model";
import {FilterLogicalOperators} from "../../../../core/models/pageRequest/enums/FilterLogicalOperators";
import {FilterOperators} from "../../../../core/models/pageRequest/enums/FilterOperators";
import {PaginatedResult} from "../../../../core/models/pageRequest/paginatedResult.model";
import {CharacteristicService} from "../../../../core/services/characteristic.service";
import {Characteristic} from "../../../../core/models/characteristic.model";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent {
  productId?: string;
  product?: Product;
  categories: Category[] = [];
  categoriesName: string[] = [];
  selectedCategory: string = '';
  characteristics: Characteristic[] = [];
  type: string = 'number';
  imagePath?: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // productForm: FormGroup = new FormGroup({
  //   nameCtrl: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(120)
  //   ]),
  //   descriptionCtrl: new FormControl (['',
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(120)]),
  //   weightCtrl: new FormControl([0,
  //   Validators.required,
  //   Validators.min(0.1),
  //   Validators.max(5000)]),
  //   priceCtrl: new FormControl([0,
  //   Validators.required,
  //   Validators.min(1)])
  // })


  ngOnInit() {
    const pagedRequest: PagedRequest = {
      pageIndex: 1, pageSize: 40,
      columnNameForSorting: 'Name',
      sortDirection: 'Ascending',
      requestFilters: {
        logicalOperator: FilterLogicalOperators.And,
        filters: [{path: 'SubCategories.Count()', value: '0', operator: FilterOperators.EqualsNumber}]
      }
    }

    this._categoryService.getCategories(pagedRequest)
      .subscribe((paginatedResult: PaginatedResult<Category>) => {
        this.categories = paginatedResult.items;

        this.categories.forEach((category: Category) => {
          this.categoriesName.push(category.name)
        })
        this.selectedCategory = this.categoriesName[0];

        this._characteristicService.getCharacteristicsByCategoryId(this.categories[0].id ?? '')
          .subscribe((characteristics: Characteristic[]) => {
            this.characteristics = characteristics;
          })
      })
  }

  getType(type: string) {
    switch (type) {
      case 'String': {
        return 'text';
      }
      case 'DateTime': {
        return 'date';
      }
      default: {
        return 'number';
      }
    }
  }

  uploadFinished = (event: any) => {
    this.productId = event.result.productId;
    this.imagePath = event.result.dbPath;
  }

  changeCategory() {
    const id = this.categories.find(x => x.name == this.selectedCategory)?.id ?? '';

    this._characteristicService.getCharacteristicsByCategoryId(id)
      .subscribe((characteristics: Characteristic[]) => {
        this.characteristics = characteristics;
      })
  }

  constructor(private _route: ActivatedRoute, private _productService: ProductService,
              private _formBuilder: FormBuilder, private _categoryService: CategoryService,
              private _characteristicService: CharacteristicService) {
    _route.queryParams.subscribe((queryParam: Params) => {
      const id: string | undefined = queryParam['id'];

      if (id) {
        _productService.getProduct(id).subscribe((product: Product) => {
          this.product = product;
          this.productId = product.id;
        })
      }
    })

    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(120)
      ]),
      descriptionCtrl: new FormControl ('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(120)]),
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
