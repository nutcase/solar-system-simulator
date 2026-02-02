/** 1 AU = this many scene units */
export const AU_TO_SCENE = 10;

/** Convert AU distance to scene units */
export function auToScene(au: number): number {
  return au * AU_TO_SCENE;
}
