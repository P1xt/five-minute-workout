import { Component, OnDestroy } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "fmw-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
  imports: [],
})
export class TimerComponent implements OnDestroy {
  readonly TOTAL_SECONDS = 300;

  elapsed = 0;

  running = false;
  paused = false;
  done = false;

  enableSound = true;

  private sub?: Subscription;
  private startTime = 0;

  start(): void {
    this.reset();

    this.running = true;
    this.paused = false;

    this.startTime = Date.now();

    this.startInterval();
  }

  pause(): void {
    if (!this.running) return;

    this.sub?.unsubscribe();

    this.running = false;
    this.paused = true;
  }

  resume(): void {
    if (!this.paused || this.done) return;

    this.running = true;
    this.paused = false;

    this.startTime = Date.now() - this.elapsed * 1000;

    this.startInterval();
  }

  reset(): void {
    this.sub?.unsubscribe();

    this.elapsed = 0;

    this.running = false;
    this.paused = false;
    this.done = false;
  }

  private startInterval(): void {
    this.sub = interval(100).subscribe(() => {
      const seconds = Math.floor((Date.now() - this.startTime) / 1000);

      this.elapsed = Math.min(seconds, this.TOTAL_SECONDS);

      if (this.elapsed >= this.TOTAL_SECONDS) {
        this.finish();
      }
    });
  }

  private finish(): void {
    this.sub?.unsubscribe();

    this.elapsed = this.TOTAL_SECONDS;

    this.running = false;
    this.paused = false;
    this.done = true;

    if (this.enableSound) {
      const audio = new Audio("/assets/timer-finish.mp3");

      audio.play();
    }
  }

  get progress(): number {
    return (this.elapsed / this.TOTAL_SECONDS) * 100;
  }

  get timeRemaining(): string {
    const remaining = this.TOTAL_SECONDS - this.elapsed;

    const min = Math.floor(remaining / 60);

    const sec = remaining % 60;

    return `${min}:${String(sec).padStart(2, "0")}`;
  }

  get barColor(): string {
    const p = this.progress;

    if (p < 50) return "#39d353";
    if (p < 75) return "#f0c000";
    if (p < 90) return "#ff8c00";

    return "#ff4d4d";
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
