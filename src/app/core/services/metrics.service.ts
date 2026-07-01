import { Injectable, inject } from "@angular/core";
import { WorkoutCompletion } from "@app/core/models/user-data.model";
import { WorkoutHistoryService } from "./workout-history.service";

export interface CategoryTrend {
  category: string;
  count: number;
}

export interface MetricsSummary {
  today: number;
  week: number;
  month: number;
  total: number;
  categoryTrends: CategoryTrend[];
}

@Injectable({ providedIn: "root" })
export class MetricsService {
  private readonly historyService = inject(WorkoutHistoryService);

  async summary(now = new Date()): Promise<MetricsSummary> {
    return this.calculate(await this.historyService.history(), now);
  }

  calculate(history: WorkoutCompletion[], now = new Date()): MetricsSummary {
    const startToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startWeek = new Date(startToday);
    startWeek.setDate(startToday.getDate() - startToday.getDay());
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const after = (date: string, boundary: Date) => new Date(date) >= boundary;
    const categoryCounts = new Map<string, number>();
    history.forEach((entry) =>
      categoryCounts.set(
        entry.category,
        (categoryCounts.get(entry.category) ?? 0) + 1,
      ),
    );
    return {
      today: history.filter((entry) => after(entry.completedAt, startToday))
        .length,
      week: history.filter((entry) => after(entry.completedAt, startWeek))
        .length,
      month: history.filter((entry) => after(entry.completedAt, startMonth))
        .length,
      total: history.length,
      categoryTrends: [...categoryCounts.entries()]
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
    };
  }
}
