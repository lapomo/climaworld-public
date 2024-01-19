import { climaworldLogo, edenprojectsLogo, theoceancleanupLogo } from "../assets/img";
import { edenprojects, theoceancleanup } from "../assets/text/projects";

export function getProjectLogo(tag) {
  let imgsrc;
  switch (tag) {
    case "tree-planting":
      imgsrc = edenprojectsLogo;
      break;
    case "ocean-plastic":
      imgsrc = theoceancleanupLogo;
      break;
    default:
  }
  return imgsrc
}

export function getProjectDescription(tag){
    let descr;
    switch (tag) {
        case "tree-planting":
          descr = edenprojects();
          break;
        case "ocean-plastic":
          descr = theoceancleanup();
          break;
        default:
      }
      return descr
}