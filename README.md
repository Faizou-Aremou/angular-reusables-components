
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-rvy6w4)


# Tab-group

## Avantages

1. Permettra de factoriser tous les codes de creations de tab sur les cas d'utilisations les plus communes à savoir:
 - creation de tab statics
 - creation d'une tab statiques, puis creation de tab dynamiques à partir de la tab statique

2. Facilitera la maintenance due à la factorisation du code
3. Utilisation possible dans d'autres projets de swissRiskcare
4. Permettra d'avoir un niveau d'abstraction au dessus de angular matérial. Ainsi si on le souhaite ne plus utiliser la Mat-table pour des raison de design par exemple cela sera possible très aisément en modifiant le composant Tab-group


## Fonctionnalités

- creation de tab statics (1 ou plusieurs)

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
- creation d'une ou plusieurs tab dynamiques complémentaires

  `this.tabGroup.addTabDynamically(
    {
    label:"Informations",
    contentInfos:company
    }
)`

4. le composant qui utilise Tab-group n'a plus à ce soucier de la suppression des tabs. tout est géré automatiquement par l'objet `TabGroup`
5. L'implémentation est performante car tab-group est conçu en se souciant de la detection.push

`@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})`

