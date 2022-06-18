import { MatMenuDefaultOptions } from "@angular/material/menu";
import { MenuButton } from "./menu-button.model";

export interface MatMenuBased extends MenuButton {
    matMenuDefaultOptions: MatMenuDefaultOptions
}