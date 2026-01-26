import { actors } from "../data/data.js";

export const chechIfActorExist = (req, res, next) => {
  const { id } = req.params;

  const actor = actors.find((item) => item.id === Number(id));

  if (!actor) {
    return res.status(404).json({ message: "Glumac ne postoji" });
  }

  req.actor = actor;

  next();
};

//Mozda malo redundantno, svaki prosljeduje odredene potrebne podatke, ali moglo se i u jednom
export const chechIfActorExistAndIndex = (req, res, next) => {
  const { id } = req.params;

  const actor = actors.findIndex((item) => item.id === Number(id));

  if (actor === -1) {
    return res.status(404).json({ message: "Glumac ne postoji" });
  }

  req.actorIndex = actor;

  next();
};
