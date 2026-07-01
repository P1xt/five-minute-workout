import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppSettings, ThemeMode } from "@app/core/models/user-data.model";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class SettingsService {
  private readonly storage = inject(StorageService);

  private readonly subject = new BehaviorSubject<AppSettings | undefined>(
    undefined,
  );
  readonly settings$ = this.subject.asObservable();

  async load(): Promise<AppSettings> {
    const settings = await this.storage.getSettings();
    this.subject.next(settings);
    this.applyTheme(settings);
    return settings;
  }

  async save(settings: AppSettings): Promise<void> {
    await this.storage.saveSettings(settings);
    this.subject.next(settings);
    this.applyTheme(settings);
  }

  async setSelectedPlanIds(selectedPlanIds: string[]): Promise<void> {
    const settings = await this.load();
    await this.save({ ...settings, selectedPlanIds });
  }

  async setTheme(themeMode: ThemeMode): Promise<void> {
    const settings = await this.load();
    await this.save({ ...settings, themeMode });
  }

  applyTheme(settings: AppSettings): void {
    const root = document.documentElement;
    root.dataset["theme"] = settings.themeMode;
  }
}
