
[demo on StackBlitz ⚡️](https://stackblitz.com/edit/angular-rvy6w4)



# Tab-group

## Avantages

1. Permettra de factoriser tous les codes de creations de tab sur les cas d'utilisations les plus communes à savoir:
 - creation de tab statics
 - creation d'une tab statiques, puis création de tab dynamiques à partir d'une tab statique

2. Facilitera la maintenance due à la factorisation du code
3. Utilisation possible dans d'autres projets de swissRiskcare
4. Permettra d'avoir un niveau d'abstraction au dessus de angular matérial. Ainsi si on le souhaite ne plus utiliser la Mat-table pour des raisons de design par exemple cela sera possible très aisément en modifiant le composant Tab-group
5. Simplicité d'utilisation


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
 2. Le theme basic accessible en dev avec la commande `npm start-basic` b