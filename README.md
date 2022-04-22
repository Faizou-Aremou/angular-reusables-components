
[demo on StackBlitz ⚡️](https://stackblitz.com/edit/angular-rvy6w4)


# Composant table
## Avantages

1. Mutualise la création de tableau de données
2. Simplicité d'utilisation
3. Fonctionne avec un DataSource par défaut

## Fonctionnalités

- Utilisation basique de `tableComponent`

Dans le composant parent

`public initialSort: Sort<Role> = { active: "code", direction:  "desc" };`

  `public dataSource = new CustomDataSource<Role>(
    (request) => this.roleListService.getRoles(request),
    this.initialSort
  );` 

Dans la vue du composant parent

`
<app-table [dataSource]="dataSource" [tableColumns]="tableColumns">
</app-table> 
`

- Utilisation en définissant une colonne d'action supplémentaire

`<app-table [dataSource]="dataSource" [tableColumns]="tableColumns" [addActionsColumn]="addActionsColumn">
    <ng-template #actionsButton let-element>
        <button id="actions-button" mat-flat-button color="primary" aria-label="informations button" (click)="onEditElement(element)">
            <span> details </span>
        </button>
    </ng-template>
</app-table>`

- Utilisation en redéfinissant l'affichage par défaut d'une colonne: utile dans les cas où on souhaite redéfinir une colonne avec un affichage customisé. Dans cet exemple, nous redéfinir la colonne name. 

`<app-table [dataSource]="dataSource" [tableColumns]="tableColumns" [addActionsColumn]="addActionsColumn">
    <ng-template [tableColumnDef]="'name'" let-element>
        <button id="actions-button" mat-flat-button color="primary" aria-label="informations button" (click)="onEditElement(element)">
            <span> details </span>
        </button>
    </ng-template>
    <ng-template #actionsButton let-element>
        <button id="actions-button" mat-flat-button color="primary" aria-label="informations button" (click)="onEditElement(element)">
            <span> details </span>
        </button>
    </ng-template>
</app-table>`

# Tab-group

## Avantages

1. Permet la creation de tab sur les cas d'utilisations les plus communes à savoir:
 - creation de tab statics
 - creation de tabs statiques (une ou plusieurs), puis création de tabs dynamiques à partir des tabs statiques

2. Facilite la maintenance, car la création de tab se fait au travers d'un seul et unique composant
3. Utilisation possible dans d'autres projets de SRC
4. Permet d'avoir un niveau d'abstraction au dessus de angular matérial. Ainsi si on le souhaite ne plus utiliser la Mat-table pour des raisons de design par exemple, ce sera possible très aisément en modifiant le composant Tab-group
5. Simplicité d'utilisation


## Fonctionnalités

- Creation de tab statics (1 ou plusieurs)

`public tabGroup = new TabGroup<Company>(
    [
      {
        label: "Companies list"
      },
      {
        label: "Roles list"
      }
    ]
  )`
- Creation d'une ou plusieurs tab dynamiques complémentaires

  `this.tabGroup.addTabDynamically(
    {
    label:"Informations",
    contentInfos:company
    }
)`
- La directive `appStaticTabsContent` permet d'identifer les contenus statiques, et l'elementRef `dynamicTabsContent` permettent d'identifier le contenu utilisé pour les tabs dynamiques.

4. le composant qui utilise Tab-group n'a plus à se soucier de la suppression des tabs. tout est géré automatiquement par l'objet `TabGroup`
5. L'implémentation est performante car tab-group est conçu en se souciant de la detection.push

`@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})`

# CustomDataSource 

DataSource alternatif à MatTableDataSource, car supportant les filtrages et la pagination coté server. De plus il peut être utilisé pour d'autres composants affichant des données comme:

- Mat tree

- un dashboard affichant des données 

# Theming

deux themes sont disponibles:
 1. Le theme purple-green accessible en dev avec la commande `npm start`
 2. Le theme basic accessible en dev avec la commande `npm start-basic` 
