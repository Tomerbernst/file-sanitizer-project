import { Component, Input } from '@angular/core';
import { UploadFile } from '../upload-file.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css'],
  animations: [
    trigger('progressAnimation', [
      state('0', style({ width: '0%' })),
      transition('* <=> *', animate('{{ duration }}ms cubic-bezier(0.35, 0, 0.25, 1)')),
    ]),
  ],
})

export class StatusBarComponent {
  @Input() fileListData: UploadFile[];

  getDuration(progress: number): number {
    const maxDuration = 1000; // set a maximum duration of 1 second
    const duration = progress / 100 * maxDuration;
    return Math.min(duration, maxDuration);
  }

  ngOnInit() {
  }

  deleteFile(index: number){
    this.fileListData.splice(index, 1);
  }

}
