// src/data/conductors.ts

export interface Conductor {
  id: string;
  name: string;
  family: "ACSR" | "AAAC" | "AAC";
  material: string;

  // Physical properties
  diameter: number;          // mm
  aluminiumArea: number;     // mm²
  totalArea: number;         // mm²
  weightPerKm: number;       // kg/km
  resistance20: number;      // Ω/km @ 20°C

  // Construction
  aluminiumStrands: string;
  steelStrands?: string;

  description: string;
}

export const conductors: Conductor[] = [
  // =========================
  // ACSR CONDUCTORS
  // =========================

  {
    id: "squirrel",
    name: "Squirrel",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 6.33,
    aluminiumArea: 20,
    totalArea: 20.98,
    weightPerKm: 85,
    resistance20: 1.394,
    aluminiumStrands: "6/2.11",
    steelStrands: "1/2.11",
    description: "Light distribution conductor"
  },

  {
    id: "weasel",
    name: "Weasel",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 7.77,
    aluminiumArea: 30,
    totalArea: 31.61,
    weightPerKm: 128,
    resistance20: 0.929,
    aluminiumStrands: "6/2.59",
    steelStrands: "1/2.59",
    description: "Distribution overhead conductor"
  },

  {
    id: "rabbit",
    name: "Rabbit",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 10.05,
    aluminiumArea: 50,
    totalArea: 52.88,
    weightPerKm: 214,
    resistance20: 0.552,
    aluminiumStrands: "6/3.35",
    steelStrands: "1/3.35",
    description: "11–33 kV distribution conductor"
  },

  {
    id: "raccoon",
    name: "Raccoon",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 12.27,
    aluminiumArea: 80,
    totalArea: 91.97,
    weightPerKm: 318,
    resistance20: 0.371,
    aluminiumStrands: "6/4.09",
    steelStrands: "1/4.09",
    description: "Medium distribution conductor"
  },

  {
    id: "dog",
    name: "Dog",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 14.15,
    aluminiumArea: 100,
    totalArea: 118.5,
    weightPerKm: 394,
    resistance20: 0.273,
    aluminiumStrands: "6/4.72",
    steelStrands: "7/1.57",
    description: "33–66 kV overhead conductor"
  },

  {
    id: "wolf",
    name: "Wolf",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 18.13,
    aluminiumArea: 150,
    totalArea: 194.9,
    weightPerKm: 726,
    resistance20: 0.182,
    aluminiumStrands: "30/2.59",
    steelStrands: "7/2.59",
    description: "Sub-transmission conductor"
  },

  {
    id: "panther",
    name: "Panther",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 21.00,
    aluminiumArea: 200,
    totalArea: 261.5,
    weightPerKm: 976,
    resistance20: 0.139,
    aluminiumStrands: "30/3.00",
    steelStrands: "7/3.00",
    description: "132 kV transmission conductor"
  },

  {
    id: "kundah",
    name: "Kundah",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 26.88,
    aluminiumArea: 300,
    totalArea: 329.0,
    weightPerKm: 1282,
    resistance20: 0.094,
    aluminiumStrands: "54/2.67",
    steelStrands: "7/2.67",
    description: "220 kV transmission conductor"
  },

  {
    id: "zebra",
    name: "Zebra",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 28.62,
    aluminiumArea: 400,
    totalArea: 484.5,
    weightPerKm: 1621,
    resistance20: 0.069,
    aluminiumStrands: "54/3.18",
    steelStrands: "7/3.18",
    description: "220–400 kV transmission conductor"
  },

  {
    id: "moose",
    name: "Moose",
    family: "ACSR",
    material: "Aluminium + Galvanized Steel",
    diameter: 31.77,
    aluminiumArea: 520,
    totalArea: 597.0,
    weightPerKm: 1998,
    resistance20: 0.056,
    aluminiumStrands: "54/3.53",
    steelStrands: "7/3.53",
    description: "Extra High Voltage transmission conductor"
  },

  // =========================
  // AAAC CONDUCTORS
  // =========================

  {
    id: "aaac100",
    name: "AAAC 100",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 13.4,
    aluminiumArea: 100,
    totalArea: 100,
    weightPerKm: 274,
    resistance20: 0.321,
    aluminiumStrands: "19 Strands",
    description: "AAAC alloy distribution conductor"
  },

  {
    id: "aaac150",
    name: "AAAC 150",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 16.9,
    aluminiumArea: 150,
    totalArea: 150,
    weightPerKm: 412,
    resistance20: 0.214,
    aluminiumStrands: "19 Strands",
    description: "AAAC medium-capacity conductor"
  },

  {
    id: "aaac232",
    name: "AAAC 232",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 21.0,
    aluminiumArea: 232,
    totalArea: 232,
    weightPerKm: 636,
    resistance20: 0.138,
    aluminiumStrands: "37 Strands",
    description: "AAAC transmission conductor"
  },

  {
    id: "aaac300",
    name: "AAAC 300",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 24.3,
    aluminiumArea: 300,
    totalArea: 300,
    weightPerKm: 823,
    resistance20: 0.106,
    aluminiumStrands: "37 Strands",
    description: "High-capacity AAAC conductor"
  },

  // =========================
  // AAC CONDUCTORS
  // =========================

  {
    id: "aac50",
    name: "AAC 50",
    family: "AAC",
    material: "EC Grade Aluminium",
    diameter: 9.1,
    aluminiumArea: 50,
    totalArea: 50,
    weightPerKm: 137,
    resistance20: 0.641,
    aluminiumStrands: "7 Strands",
    description: "AAC distribution conductor"
  },

  {
    id: "aac100",
    name: "AAC 100",
    family: "AAC",
    material: "EC Grade Aluminium",
    diameter: 12.9,
    aluminiumArea: 100,
    totalArea: 100,
    weightPerKm: 274,
    resistance20: 0.320,
    aluminiumStrands: "19 Strands",
    description: "AAC overhead conductor"
  },

  {
    id: "aac150",
    name: "AAC 150",
    family: "AAC",
    material: "EC Grade Aluminium",
    diameter: 15.8,
    aluminiumArea: 150,
    totalArea: 150,
    weightPerKm: 411,
    resistance20: 0.213,
    aluminiumStrands: "37 Strands",
    description: "High-capacity AAC conductor"
  },

  {
    id: "aac200",
    name: "AAC 200",
    family: "AAC",
    material: "EC Grade Aluminium",
    diameter: 18.2,
    aluminiumArea: 200,
    totalArea: 200,
    weightPerKm: 548,
    resistance20: 0.160,
    aluminiumStrands: "37 Strands",
    description: "Transmission AAC conductor"
  }
];

export const getConductorById = (id: string): Conductor | undefined =>
  conductors.find((conductor) => conductor.id === id);

export const families = ["ACSR", "AAAC", "AAC"] as const;
