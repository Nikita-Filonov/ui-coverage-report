export interface Config {
  agentType: string;

  repositoryUrl: string;

  apiDateFormat: string;
  apiTimeFormat: string;
}

export class SettingsManager {
  private static config: Config = {
    agentType: '',

    repositoryUrl: '',

    apiDateFormat: '',
    apiTimeFormat: ''
  };

  static setup() {
    this.config = this.getEnvConfig();
  }

  private static getEnvConfig(): Config {
    return {
      agentType: import.meta.env.VITE_AGENT_TYPE || 'ui-coverage-report',

      repositoryUrl:
        import.meta.env.VITE_REPOSITORY_URL || 'https://raw.githubusercontent.com/Nikita-Filonov/ui-coverage-report',

      apiDateFormat: import.meta.env.VITE_API_DATE_FORMAT || 'YYYY-MM-DD',
      apiTimeFormat: import.meta.env.VITE_API_TIME_FORMAT || 'HH:mm'
    };
  }

  static get agentType(): string {
    return this.config.agentType;
  }

  static get repositoryUrl(): string {
    return this.config.repositoryUrl;
  }

  static get apiDateFormat(): string {
    return this.config.apiDateFormat;
  }

  static get apiTimeFormat(): string {
    return this.config.apiTimeFormat;
  }

  static get apiDateTimeFormat(): string {
    return `${this.apiDateFormat} ${this.apiTimeFormat}`;
  }

  static getStaticFileUrl(file: string): string {
    return `${this.repositoryUrl}/main/static/${file}`;
  }
}

SettingsManager.setup();
