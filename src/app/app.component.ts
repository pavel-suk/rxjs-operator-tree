import { AfterViewInit, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { OperatorDecisionTreeDataService } from './services/operator-decision-tree-data';
import { OperatorDecisionTree } from './models/interfaces';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarkdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  protected readonly rxjsApiDataService = inject(OperatorDecisionTreeDataService)

  protected readonly markdownService = inject(MarkdownService);

  protected datastring = "    Init: Operator Decision Tree ";

  ngOnInit(): void {
    this.rxjsApiDataService.getDecisionTree$().subscribe((data) => {
      console.log(data);

      const initial = data["initial"];

      if(initial.options.length > 0) {
        for (let i = 0; i < initial.options.length; i++) {
          const element = initial.options[i];
          
          const node = data[element];
          this.datastring += `\n    ${element}:${node.label}`;
          this.datastring += `\n    Init --> ${element}`;
          

          if(node.options && node.options.length > 0) {
            for (let j = 0; j < node.options.length; j++) {
              const newEl = node.options[j];
              this.findNestedData(data, newEl, element);
            }
          }

          
        }
       
      }

      console.log(initial);
    });
  }

  findNestedData(data: OperatorDecisionTree, id: string, beforeId: string) {
    const node = data[id];

    if(node.options && node.options.length > 0) {
      this.datastring += `\n    ${id}:${node.label}`;
      this.datastring += `\n    ${beforeId} --> ${id}`;
      
      for (let i = 0; i < node.options.length; i++) {
        const element = node.options[i];
        this.findNestedData(data, element, node.id);
      }
    } else {
      this.datastring += `\n    ${id}:${node.label}`;
      this.datastring += `\n    ${beforeId} --> ${id}`;
    }
  }






}

