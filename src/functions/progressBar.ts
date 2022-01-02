import { SingleBar } from 'cli-progress';


function* makeProgressBar(total: number, name: string) {
  const bar = new SingleBar({
    format: `${name} {bar} | {percentage}% || {value}/{total} Chunks || Speed: {speed}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
  bar.start(total, 0);
  yield
  for (let i = 0; i < total; i++) {
    yield bar.increment();
  } 
  bar.stop();
}

const progressBar = (total: number, name: string) => {
  const bar = makeProgressBar(total, name);
  bar.next();
  return bar;
}

export { progressBar };
