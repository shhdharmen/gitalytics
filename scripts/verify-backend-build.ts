import { exec } from 'npm-run';

exec(
  'npm run nx print-affected -- --base=origin/main --select="projects"',
  (error, stdout, stderr) => {
    if (error) process.exit(1);
    console.log(stdout);
    if (!stdout.includes('api')) process.exit(1);
  }
);
