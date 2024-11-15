import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() mediaData: any;
  selectedTab: string = 'audio';
  selectedTrack: any;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  selectTrack(track: any) {
    this.selectedTrack = track;
  }
}
