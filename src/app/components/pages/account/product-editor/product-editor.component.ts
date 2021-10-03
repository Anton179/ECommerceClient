import {ChangeDetectorRef, Component} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
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
import {AuthService} from "../../../../core/services/auth.service";
import {Observable} from "rxjs";
import {DialogService} from "../../../../core/services/dialog.service";
import {CanComponentDeactivate} from "../../../../core/services/canDeactivate-guard.service";

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements CanComponentDeactivate{
  imageId?: string;
  product?: Product;
  categories: Category[] = [];
  categoriesName: string[] = [];
  selectedCategory: string = '';
  characteristics: Characteristic[] = [];
  type: string = 'number';
  imagePath?: string;
  displayImagePath?: string;
  isUpdating: boolean = false;

  productInformationFormGroup: FormGroup = new FormGroup({
    nameCtrl: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(120)
    ]),
    descriptionCtrl: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(470)]),
    categoryCtrl: new FormControl(undefined, [
      Validators.required
    ]),
    imageCtrl: new FormControl('', [
      Validators.required
    ])
  });

  characteristicFormGroup: FormGroup = new FormGroup({
    weightCtrl: new FormControl(0, [
      Validators.required,
      Validators.min(0.1),
      Validators.max(5000)]),
    priceCtrl: new FormControl(0, [
      Validators.required,
      Validators.min(1)])
  });

  constructor(private _route: ActivatedRoute, private _productService: ProductService,
              private _formBuilder: FormBuilder, private _categoryService: CategoryService,
              private _characteristicService: CharacteristicService, private cdr: ChangeDetectorRef,
              private _router: Router, private _authService: AuthService, private _dialogService: DialogService) {

    const pagedRequest: PagedRequest = {
      pageIndex: 1, pageSize: 40,
      columnNameForSorting: 'Name',
      sortDirection: 'Ascending',
      requestFilters: {
        logicalOperator: FilterLogicalOperators.And,
        filters: [{path: 'SubCategories.Count()', value: '0', operator: FilterOperators.EqualsNumber}]
      }
    }

    _route.queryParams.subscribe((queryParam: Params) => {
      const id: string | undefined = queryParam['id'];

      this._categoryService.getPaginatedCategories(pagedRequest)
        .subscribe((paginatedResult: PaginatedResult<Category>) => {
          this.categories = paginatedResult.items;

          this.categories.forEach((category: Category) => {
            this.categoriesName.push(category.name)
          })

          if (id) {
            _productService.getProduct(id).subscribe((product: Product) => {
              this._authService.getUserId().then(userId => {
                if (product.ownerId != userId) {
                  this._router.navigateByUrl('/account/product')
                } else {
                  this.setProductValues(product)
                }
              })
            })
          } else {
            this.selectedCategory = this.categoriesName[0];

            this._characteristicService.getCharacteristicsByCategoryId(this.categories[0].id ?? '')
              .subscribe((characteristics: Characteristic[]) => {
                this.characteristics = characteristics;

                this.characteristicFormGroup = this.createCharacteristicFormGroup(characteristics)
              })
          }
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
    this.displayImagePath = event.result.imagePath + '?' + Date.now()
    this.imagePath = event.result.imagePath
    this.imageId = event.result.imageId;

    this.productInformationFormGroup.controls['imageCtrl'].setErrors(null)
  }

  changeCategory() {
    const id = this.categories.find(x => x.name == this.selectedCategory)?.id ?? '';

    this._characteristicService.getCharacteristicsByCategoryId(id)
      .subscribe((characteristics: Characteristic[]) => {
        this.characteristics = characteristics;

        this.characteristicFormGroup = this.createCharacteristicFormGroup(characteristics)
      })
  }

  createCharacteristicFormGroup(characteristics: Characteristic[], setValue: boolean = false,
                                weight: number = 0, price: number = 0) {
    const group = this._formBuilder.group({
      weightCtrl: new FormControl(0, [
        Validators.required,
        Validators.min(0.1),
        Validators.max(5000)]),
      priceCtrl: new FormControl(0, [
        Validators.required,
        Validators.min(1)])
    });

    characteristics.forEach(ch => group.addControl(ch.name,
      this._formBuilder.control('', [
        Validators.required
      ])))

    if (setValue) {
      group.controls['weightCtrl'].setValue(weight)
      group.controls['priceCtrl'].setValue(price)

      characteristics.forEach(ch => group.controls[ch.name].setValue(ch.value))
    }

    return group;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isUpdating && (this.productInformationFormGroup.dirty || this.characteristicFormGroup.dirty)) {
      return this._dialogService.confirm('Discard changes for Product?');
    }
    return true;
  }

  createProduct() {
    this.characteristics.forEach(ch => {
      ch.value = this.characteristicFormGroup.controls[ch.name].value
    })

    const categoryId: string = this.categories.find(x => x.name == this.selectedCategory)?.id ?? '';

    const product: Product = {
      name: this.productInformationFormGroup.controls['nameCtrl'].value,
      description: this.productInformationFormGroup.controls['descriptionCtrl'].value,
      categoryId: categoryId,
      weight: this.characteristicFormGroup.controls['weightCtrl'].value,
      price: this.characteristicFormGroup.controls['priceCtrl'].value,
      imagePath: this.imagePath,
      inStock: true,
      characteristics: this.characteristics
    }

    this.isUpdating = true;

    this._productService.createProduct(product).subscribe((id) => {
      this._router.navigateByUrl(`/products/${id}`)
    });
  }

  updateProduct() {
    this.characteristics.forEach(ch => {
      ch.value = this.characteristicFormGroup.controls[ch.name].value
    })

    const categoryId: string = this.categories.find(x => x.name == this.selectedCategory)?.id ?? '';

    const product: Product = {
      name: this.productInformationFormGroup.controls['nameCtrl'].value,
      description: this.productInformationFormGroup.controls['descriptionCtrl'].value,
      categoryId: categoryId,
      weight: this.characteristicFormGroup.controls['weightCtrl'].value,
      price: this.characteristicFormGroup.controls['priceCtrl'].value,
      imagePath: this.imagePath,
      inStock: true,
      characteristics: this.characteristics
    }

    this.isUpdating = true;

    this._productService.updateProduct(product, this.product?.id ?? '').subscribe((id) => {
      this._router.navigateByUrl(`/products/${id}`)
    });
  }

  next() {
    this.productInformationFormGroup.controls['imageCtrl'].markAsTouched()
  }

  setProductValues(product: Product) {
    this.productInformationFormGroup.controls['nameCtrl'].setValue(product.name)
    this.productInformationFormGroup.controls['descriptionCtrl'].setValue(product.description)
    this.productInformationFormGroup.controls['categoryCtrl'].setValue(product.category?.name)
    this.selectedCategory = product.category?.name ?? '';
    this.characteristicFormGroup = this.createCharacteristicFormGroup(product.characteristics,
      true, product.weight, product.price)
    this.characteristics = product.characteristics

    this.product = product
    this.imagePath = product.imagePath
    this.displayImagePath = product.imagePath;
    this.productInformationFormGroup.controls['imageCtrl'].setErrors(null)
  }
}
