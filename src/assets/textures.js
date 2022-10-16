import { NearestFilter, TextureLoader } from "three";

import cobblestone from "./cobblestone.png";
import dirt from "./dirt.png";
import grass from "./grass.png";

export const cobblestoneTexture = new TextureLoader().load(cobblestone);
export const dirtTexture = new TextureLoader().load(dirt);
export const grassTexture = new TextureLoader().load(grass);

cobblestoneTexture.magFilter = NearestFilter;
dirtTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
