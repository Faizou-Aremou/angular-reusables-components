import { Link } from "../link/link.model";
import {DataNode} from "../node.model"

export class Navbar {
  private _nodeLinks: DataNode<Link>[];
  public get nodeLinks(): DataNode<Link>[] {
    return this._nodeLinks;
  }
  public set nodeLinks(value: DataNode<Link>[]) {
    this._nodeLinks = [...value];
  }
  private _infos?: string | undefined;
  public get infos(): string | undefined {
    return this._infos;
  }
  public set infos(value: string | undefined) {
    this._infos = value;
  }
  private _icon?: string | undefined;
  public get icon(): string | undefined {
    return this._icon;
  }
  public set icon(value: string | undefined) {
    this._icon = value;
  }
  private _color?: string | undefined;
  public get color(): string | undefined {
    return this._color;
  }
  public set color(value: string | undefined) {
    this._color = value;
  }
  constructor(nodeLinks: DataNode<Link>[], infos?: string, icon?: string, color?: string) {
    this._infos = infos;
    this._icon = icon;
    this._color = color;
    this._nodeLinks = [...nodeLinks];
  }
}
/**
   - contain link for other sections in the app
   - display all page in the web site
   - accessible whatever in the website
   */
