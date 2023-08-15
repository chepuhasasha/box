import type { BoxGeometry } from "./primitives";

export interface Container {
  id: string;
  name: string;
  type_code: string;
  boxes: string[];
  geometry: BoxGeometry;
}
