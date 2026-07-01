import { Component, OnInit, inject } from "@angular/core";
import {
  MetricsService,
  MetricsSummary,
} from "@app/core/services/metrics.service";

@Component({
  standalone: true,
  selector: "fmw-metrics",
  templateUrl: "./metrics.component.html",
})
export class MetricsComponent implements OnInit {
  private readonly metrics = inject(MetricsService);

  summary?: MetricsSummary;

  async ngOnInit(): Promise<void> {
    this.summary = await this.metrics.summary();
  }

  width(count: number): number {
    const max = Math.max(
      ...(this.summary?.categoryTrends.map((item) => item.count) ?? [1]),
      1,
    );
    return Math.max(8, Math.round((count / max) * 100));
  }
}
