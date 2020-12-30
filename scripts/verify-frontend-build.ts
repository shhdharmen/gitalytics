import { exec } from 'npm-run';

exec(
  'npm run nx print-affected -- --base=origin/main --select="projects"',
  (error, stdout, stderr) => {
    if (error) process.exit(1);
    if (!stdout.includes('client')) process.exit(1);
  }
);
