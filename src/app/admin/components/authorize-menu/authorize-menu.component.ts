import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {BaseComponent} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {ApplicationService} from "../../../services/common/models/application.service";
import {DialogService} from "../../../services/common/dialog.service";
import {AuthorizeMenuDialogComponent} from "../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component";

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
              private applicationService: ApplicationService,
              private dialogService: DialogService) {
    super(spinner)
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: menu.actions?.length > 0,
        name: menu.name,
        level: level,
        code: menu.code
      };
    },
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.actions,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  async ngOnInit() {
    this.dataSource.data = (await this.applicationService.getAuthorizeDefinitionEndpoints()).map(c => {
      const treeMenu: ITreeMenu = {
        name: c.name,
        actions: c.actions.map(c => {
          const _treeMenu: ITreeMenu = {
            name: c.definition,
            code: c.code
          }
          return _treeMenu;
        })
      };
      return treeMenu;
    });

  }

  assignRole(code: string, name: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: {code, name},
      options: {
        width: "750px"
      },
      afterClosed: () => {

      }
    })
  }
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface ITreeMenu {
  name?: string,
  actions?: ITreeMenu[],
  code?: string
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

