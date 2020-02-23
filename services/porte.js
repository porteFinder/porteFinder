import { Container } from "typedi";
import config from "../config";

export default class PorteService {
  constructor(ContainerInstance) {
    for (const service of ContainerInstance.services) {
      this[service.id] = service.value;
    }
  }

  async update_one(porte) {
    this.logger.silly("Checking voisin length");
    console.log(porte);
    if (porte.voisins.length !== 7) {
      throw new Error("Pas assez de voisins.");
    }
    this.logger.silly("Searching if porte exists");
    const porteDocument = await this.Porte.findById(porte._id);
    if (!porteDocument) {
      throw new Error("Cette porte n'existe pas");
    }
    const voisins = [];
    this.logger.silly("Validating voisins");
    for (const voi of porte.voisins) {
      if (voi.min === voi.max) {
        throw new Error("Min === Max");
      }
      if (voi.min > voi.max) {
        throw new Error(`SS ${voi.min} > SS ${voi.max}`);
      }
      voisins.push(new this.Voisin(voi.max, voi.min, voi.region));
    }
    this.logger.silly("Updating porte");
    porteDocument.coo = porte.coo;
    if (porte.code !== "") porteDocument.code = porte.code;
    porteDocument.voisins = voisins;
    this.logger.silly("Saving porte");
    porteDocument.save();
    return porteDocument;
  }

  async add_one(voisin, coo, code) {
    this.logger.silly("Checking voisin length");
    if (voisin.length !== 7) {
      throw new Error("Pas assez de voisin.");
    }
    this.logger.silly("Validating coo");
    const splitedCoo = coo.split(":");
    if (
      splitedCoo.length !== 4 ||
      Number.isNaN(Number(splitedCoo[0])) ||
      Number.isNaN(Number(splitedCoo[1])) ||
      Number.isNaN(Number(splitedCoo[2])) ||
      Number.isNaN(Number(splitedCoo[3]))
    ) {
      throw new Error("Coordonnées non conforme");
    }
    this.logger.silly("Searching porte's coo");
    const exists = await this.Porte.findOne({ coo: coo });
    if (exists) {
      throw new Error("Coo déjà prises");
    }
    const newPorte = new this.Porte({
      coo: coo
    });
    let voisins = [];
    this.logger.silly("Validating voisins");
    for (const voi of voisin) {
      if (!voi.length === 2) {
        throw new Error(`${voi} n'a pas la bonne forme`);
      }
      if (voi.min === voi.max) {
        throw new Error("Min === Max");
      }
      if (voi.min > voi.max) {
        throw new Error("Min > Max");
      }
      voisins.push(new this.Voisin(voi.max, voi.min, voi.region));
    }
    if (code && code !== "") newPorte.code = code;
    newPorte.voisins = voisins;
    this.logger.silly("Saving porte");
    newPorte.save();
    return newPorte;
  }

  async find_porte(coo) {
    if (coo.split(":").length !== 4) {
      throw new Error(`${coo} should be xx:xx:xx:xx`);
    }
    const split = coo.split(":");
    for (let i = 0; i < split.length; i++) {
      if (Number(split[i]) == NaN) {
        throw new Error(`${split[i]} is not a number`);
      }
    }
    this.logger.silly("Trying to find voisins");
    const region = Number(coo.split(":")[0]);
    const ss = Number(coo.split(":")[1]);
    const dbPortes = await this.Porte.find();
    const portes = dbPortes.filter(porte => {
      for (const voi of porte.voisins) {
        if (voi.region === region && voi.min <= ss && voi.max >= ss) {
          return true;
        }
      }
      return false;
    });
    return portes;
  }

  async find_voisins(coo) {
    if (coo.split(":").length !== 4) {
      throw new Error(`${coo} should be xx:xx:xx:xx`);
    }
    const split = coo.split(":");
    for (let i = 0; i < split.length; i++) {
      if (Number(split[i]) == NaN) {
        throw new Error(`${split[i]} is not a number`);
      }
    }
    const region = Number(coo.split(":")[0]);
    const ss = Number(coo.split(":")[1]);
    const portes = await this.Porte.find();
    const filtered_portes = portes.filter(
      p =>
        p.voisins[0].region === region &&
        p.voisins[0].min <= ss &&
        p.voisins[0].max >= ss
    );
    if (filtered_portes.length === 0) {
      throw new Error("Tape a la main fdp");
    }
    const autocomplete = filtered_portes[0].voisins;
    return autocomplete;
  }

  async find_all() {
    return this.Porte.find();
  }

  async delete_one(id) {
    const porte = await this.Porte.findOneAndDelete(id);
    if (!porte) {
      throw new Error("Porte inconnue");
    }
    return true;
  }
}
