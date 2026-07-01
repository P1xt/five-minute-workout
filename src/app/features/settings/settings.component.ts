import { Component, OnInit, inject } from "@angular/core";
import { AppSettings, ThemeMode } from "@app/core/models/user-data.model";
import { BackupService } from "@app/core/services/backup.service";
import { SettingsService } from "@app/core/services/settings.service";
import { StorageService } from "@app/core/services/storage.service";
import { FormsModule } from "@angular/forms";
import { TitleCasePipe } from "@angular/common";

@Component({
  standalone: true,
  selector: "fmw-settings",
  templateUrl: "./settings.component.html",
  imports: [FormsModule, TitleCasePipe],
})
export class SettingsComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);
  private readonly backup = inject(BackupService);
  private readonly storage = inject(StorageService);

  settings?: AppSettings;
  importMode: "merge" | "replace" = "merge";
  message = "";
  themeModes: ThemeMode[] = ["dark", "light"];

  async ngOnInit(): Promise<void> {
    this.settings = await this.settingsService.load();
  }

  async saveTheme(): Promise<void> {
    if (!this.settings) return;
    await this.settingsService.setTheme(this.settings.themeMode);
    this.message = "Theme saved.";
  }

  async exportBackup(): Promise<void> {
    await this.backup.exportBackup();
    this.message = "Backup exported.";
  }

  async importBackup(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      await this.backup.importBackup(file, this.importMode);
      this.settings = await this.settingsService.load();
      this.message = "Backup imported.";
    } catch (error) {
      this.message =
        error instanceof Error ? error.message : "Backup import failed.";
    } finally {
      input.value = "";
    }
  }

  async clear(): Promise<void> {
    if (
      !confirm("Clear all local notes, history, and settings on this device?")
    )
      return;
    await this.storage.clearAll();
    this.settings = await this.settingsService.load();
    this.message = "Local data cleared.";
  }
}
