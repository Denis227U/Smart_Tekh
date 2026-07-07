export async function devDelay(ms: number = 2000): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, ms));
}
