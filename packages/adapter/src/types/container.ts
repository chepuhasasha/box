import type { Box } from ".";
import type { BoxGeometry } from "./primitives";

export interface Container {
  id: string;
  name: string;
  type_code: string;
  boxes: Box[];
  geometry: BoxGeometry;
}
