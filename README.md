[demo on StackBlitz ⚡️](https://stackblitz.com/edit/angular-rvy6w4)

this project presents some components and services that can be reuse in real life projects.
# Generic composant table

## Avantages

1. Mutualize the creation of data tables
2. Easy to use
3. Works by default with extention of class DataSource

## Exemple

- Basique usage of `tableComponent`

In the parent component

```ts title="src/app/core/components/general-infos/general-infos.component.spec.ts"
public initialSort: Sort<Role> = { active: "code", direction:  "desc" };

  public dataSource = new CustomDataSource<Role>(
    (request) => this.roleListService.getRoles(request),
    this.initialSort
  );
```

In the parent component template

```html
<app-table [dataSource]="dataSource" [tableColumns]="tableColumns"> </app-table>
```

- Usage by defining an additional action column

```html
<app-table
  [dataSource]="dataSource"
  [tableColumns]="tableColumns"
  [addActionsColumn]="addActionsColumn"
>
  <ng-template #actionsButton let-element>
    <button
      id="actions-button"
      mat-flat-button
      color="primary"
      aria-label="informations button"
      (click)="onEditElement(element)"
    >
      <span> details </span>
    </button>
  </ng-template>
</app-table>
```

- Usage when redefining the default display of one column. It is useful in cases where we want to redefine a column with a custom display. In this example we redefine the column name.

```html
<app-table
  [dataSource]="dataSource"
  [tableColumns]="tableColumns"
  [addActionsColumn]="addActionsColumn"
>
  <ng-template [tableColumnDef]="'name'" let-element>
    <button
      id="actions-button"
      mat-flat-button
      color="primary"
      aria-label="informations button"
      (click)="onEditElement(element)"
    >
      <span> details </span>
    </button>
  </ng-template>
  <ng-template #actionsButton let-element>
    <button
      id="actions-button"
      mat-flat-button
      color="primary"
      aria-label="informations button"
      (click)="onEditElement(element)"
    >
      <span> details </span>
    </button>
  </ng-template>
</app-table>
```

# Tab-group

## Avantages

1. Allows the creation of tabs on the most common use cases:

- creation of tab statics
- creation of static tabs (one or more), then creation of dynamic tabs from actions on static tabs

2. Facilitates maintenance, as tab creation is done through a single component
3. Allows to have an abstraction level above material angular. So if you don't want to use the Mat-table anymore for design reasons for example, it will be possible very easily by modifying the Tab-group component
4. Easy to use

## Exemple

- Creation of tab statics (1 or more)

```ts title="src/app/core/components/general-infos/general-infos.component.spec.ts"
public tabGroup = new TabGroup<Company>(
    [
      {
        label: "Companies list"
      },
      {
        label: "Roles list"
      }
    ]
  )
```

- Creation of one or more complementary dynamics tabs

  ```ts title="src/app/core/components/general-infos/general-infos.component.spec.ts"
  this.tabGroup.addTabDynamically({
    label: "Informations",
    contentInfos: company,
  });
  ```

- directive `appStaticTabsContent` allows to identify static contents. ElementRef `dynamicTabsContent` allow to identify the content used for the dynamic tabs.

4. the component that uses Tab-group doesn't have to worry about deleting tabs anymore. everything is handled automatically by the `TabGroup` class
5. The implementation is efficient because tab-group is designed with the detection.push

```ts title="src/app/shared/components/table/table.component.spec.ts
@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
```
# CustomDataSource

DataSource is an alternative to MatTableDataSource, as it supports server-side filtering and pagination. Moreover it can be used for other components displaying data like:

- Mat tree

- a dashboard displaying data
- etc

# Upload files component

# Upload files service

it is set of functions that help to work with files in web applications
# Theming

two themes are available:
 1. The purple-green theme accessible in dev with the command `npm start`
 2. The basic theme is accessible in dev with the command `npm start-basic`

# Roadmap
- Upload files componant, that support tree form of upload: drop files, upload form buttom, upload from link, upload from label
- Right side overlay component
- Http service, that support in easy way common http requests and actions

