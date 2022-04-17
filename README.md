
[demo on StackBlitz ⚡️](https://stackblitz.com/edit/angular-rvy6w4)


# Composant table
## Avantages

1. Factorise du code de creation de table
2. Simplicité d'utilisation

## Fonctionnalités

- Utilisation basique de `tableComponent`
` <app-table [dataSource]="companies$ | async" [displayedColumns]="displayedColumns" [displayedColumnsLabels]="displayedColumnsLabels">
</app-table> `

- Utilisation en définissant une colonne d'action

`<app-table [dataSource]="companies$ | async" [displayedColumns]="displayedColumns" [displayedColumnsLabels]="displayedColumnsLabels" [addActionsColumn]="addActionsColumn">
    <ng-template #actionsButton let-element>
        <button id="actions-button" mat-flat-button color="primary" aria-label="informations button" (click)="onEditElement(element)">
            <span> details </span>
        </button>
    </ng-template>
</app-table>`

- Utilisation en redéfinissant l'affichage par défaut d'une colonne  

`<app-table [dataSource]="companies$ | async" [displayedColumns]="displayedColumns" [displayedColumnsLabels]="displayedColumnsLabels" [addActionsColumn]="addActionsColumn">
    <ng-template [tableColumn]="'name'" let-element>
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

1. Permet de factoriser tous les codes de creation de tab sur les cas d'utilisations les plus communes à savoir:
 - creation de tab statics
 - creation d'une tab statiques, puis création de tab dynamiques à partir d'une tab statique

2. Facilite la maintenance due à la factorisation du code
3. Utilisation possible dans d'autres projets de swissRiskcare
4. Permet d'avoir un niveau d'abstraction au dessus de angular matérial. Ainsi si on le souhaite ne plus utiliser la Mat-table pour des raisons de design par exemple cela sera possible très aisément en modifiant le composant Tab-group
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
- La directive `appStaticTabsContent` permet d'identifer les contenus statiques, et le l'elementRef `dynamicTabsContent` permet d'identifier le contenu utilisé pour les tabs dynamiques.

4. le composant qui utilise Tab-group n'a plus à se soucier de la suppression des tabs. tout est géré automatiquement par l'objet `TabGroup`
5. L'implémentation est performante car tab-group est conçu en se souciant de la detection.push

`@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})`


# Theming

deux themes sont disponibles:
 1. Le theme purple-green accessible en dev avec la commande `npm start`
 2. Le theme basic accessible en dev avec la commande `npm start-basic` 