import type { Box } from ".";
import type { BoxGeometry } from "./primitives";

export interface Container {
  id: string;
  name: string;
  object_type: 'CONTAINER'
  boxes: string[];
  geometry: BoxGeometry;
}
