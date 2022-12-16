import { atom } from "jotai";

// Atoms
const authAtoms = {
    clientId: atom(null),
    associationToken: atom(null),
};

export default authAtoms;
