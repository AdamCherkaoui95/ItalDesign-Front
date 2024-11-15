import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit, OnChanges {
  @Input() selectedTrack: any;
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef;

  isPlaying = false;  // For play/pause toggle
  volume = 1;         // Volume level
  progress = 0;       // Progress bar value
  currentTime = 0;    // Current time of the media
  duration = 0;       // Total duration of the media

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setupMediaPlayer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTrack'] && this.selectedTrack) {
      this.setupMediaPlayer();
      this.isPlaying = false; // Reset play/pause state
      this.progress = 0; // Reset progress
    }
  }

  setupMediaPlayer() {
    const mediaPlayer: HTMLMediaElement = this.isAudio() 
      ? this.audioPlayerRef.nativeElement 
      : this.videoPlayerRef.nativeElement;
      
    mediaPlayer.addEventListener('timeupdate', () => this.onTimeUpdate());
    mediaPlayer.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    mediaPlayer.addEventListener('play', () => this.onPlay());
    mediaPlayer.addEventListener('pause', () => this.onPause());
    mediaPlayer.addEventListener('error', (error) => this.onError(error));
  }

  // Helper to determine if the track is audio
  isAudio(): boolean {
    return this.selectedTrack?.type === 'audio';
  }

  // Helper to determine if the track is video
  isVideo(): boolean {
    return this.selectedTrack?.type === 'video';
  }

  // Play/Pause toggle
  togglePlayPause() {
    const mediaPlayer: HTMLMediaElement = this.isAudio() 
      ? this.audioPlayerRef.nativeElement 
      : this.videoPlayerRef.nativeElement;

    if (this.isPlaying) {
      // Only call pause if it's currently playing
      mediaPlayer.pause();
    } else {
      // Only call play if it's not already playing
      mediaPlayer.play().catch((error) => {
        console.error('Error attempting to play the media', error);
      });
    }
  }

  // Handle Play
  onPlay() {
    this.isPlaying = true;
  }

  // Handle Pause
  onPause() {
    this.isPlaying = false;
  }

  // Update progress and current time
  onTimeUpdate() {
    const mediaPlayer: HTMLMediaElement = this.isAudio() 
      ? this.audioPlayerRef.nativeElement 
      : this.videoPlayerRef.nativeElement;

    this.progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
    this.currentTime = mediaPlayer.currentTime;
    this.duration = mediaPlayer.duration;

    this.cdRef.detectChanges(); // Trigger change detection
  }

  // When metadata is loaded, set the duration
  onLoadedMetadata() {
    const mediaPlayer: HTMLMediaElement = this.isAudio() 
      ? this.audioPlayerRef.nativeElement 
      : this.videoPlayerRef.nativeElement;

    this.duration = mediaPlayer.duration;
    this.cdRef.detectChanges(); // Trigger change detection
  }

  // Handle errors
  onError(error: any) {
    console.error('Error playing media:', error);
  }

  // Next track (customize this method as needed)
  nextTrack() {
    console.log("Next track");
    // Implement your logic to skip to the next track
  }

  // Previous track (customize this method as needed)
  previousTrack() {
    console.log("Previous track");
    // Implement your logic to skip to the previous track
  }

  // Shuffle tracks (customize this method as needed)
  shuffleTrack() {
    console.log("Shuffle");
    // Implement shuffle logic here
  }

  // Repeat current track (customize this method as needed)
  repeatTrack() {
    console.log("Repeat");
    // Implement repeat logic here
  }
}
