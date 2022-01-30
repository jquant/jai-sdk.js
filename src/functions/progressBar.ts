import { SingleBar } from "cli-progress";

function* makeProgressBar(total: number, name: string, speed: number) {
  const bar = new SingleBar({
    format: `${name} {bar} | {percentage}% || {value}/{total} Chunks`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  bar.start(total, 0);

  yield;
  for (let i = 0; i < total; i++) {
    yield bar.increment();
  }
  bar.stop();
}

const progressBar = (total: number, name: string, speed: number) => {
  const bar = makeProgressBar(total, name, speed);
  bar.next();
  return bar;
};

export { progressBar };
