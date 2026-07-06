type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function write(level: LogLevel, message: string, metadata?: unknown): void {
  const timestamp = new Date().toISOString();
  const suffix = metadata === undefined ? '' : ` ${JSON.stringify(metadata)}`;
  const output = `[${timestamp}] [${level}] ${message}${suffix}`;

  if (level === 'ERROR') {
    console.error(output);
    return;
  }

  if (level === 'WARN') {
    console.warn(output);
    return;
  }

  console.log(output);
}

export const logger = {
  info: (message: string, metadata?: unknown): void => write('INFO', message, metadata),
  warn: (message: string, metadata?: unknown): void => write('WARN', message, metadata),
  error: (message: string, metadata?: unknown): void => write('ERROR', message, metadata)
};
