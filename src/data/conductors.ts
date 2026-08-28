// src/data/conductors.ts

export interface Conductor {
  id: string;
  name: string;
  family: "ACSR" | "AAAC" | "AAC";
  material: string;

  // Engineering data
  diameter: number;          // mm
  aluminiumArea: number;     // mm²
  totalArea: number;         // mm²
  weightPerKm: number;       // kg/km
  resistance20: number;      // ohm/km
  ampacity: number;          // A

  aluminiumStrands: string;
  steelStrands?: string;

  description: string;
}

export const conductors: Conductor[] = [
  // ---------- ACSR ----------
  {
    id: "weasel",
    name: "Weasel",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 7.77,
    aluminiumArea: 30,
    totalArea: 31.3,
    weightPerKm: 118,
    resistance20: 0.93,
    ampacity: 180,
    aluminiumStrands: "6 × 2.59 mm",
    steelStrands: "1 × 2.59 mm",
    description: "Light distribution conductor"
  },
  {
    id: "squirrel",
    name: "Squirrel",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 6.30,
    aluminiumArea: 20,
    totalArea: 21.2,
    weightPerKm: 79,
    resistance20: 1.38,
    ampacity: 140,
    aluminiumStrands: "6 × 2.11 mm",
    steelStrands: "1 × 2.11 mm",
    description: "Low-voltage distribution"
  },
  {
    id: "rabbit",
    name: "Rabbit",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 10.05,
    aluminiumArea: 50,
    totalArea: 52.9,
    weightPerKm: 214,
    resistance20: 0.56,
    ampacity: 240,
    aluminiumStrands: "6 × 3.35 mm",
    steelStrands: "1 × 3.35 mm",
    description: "11–33 kV distribution"
  },
  {
    id: "raccoon",
    name: "Raccoon",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 12.27,
    aluminiumArea: 80,
    totalArea: 84.1,
    weightPerKm: 318,
    resistance20: 0.35,
    ampacity: 300,
    aluminiumStrands: "6 × 4.09 mm",
    steelStrands: "1 × 4.09 mm",
    description: "Medium distribution conductor"
  },
  {
    id: "dog",
    name: "Dog",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 14.15,
    aluminiumArea: 100,
    totalArea: 118.5,
    weightPerKm: 394,
    resistance20: 0.273,
    ampacity: 360,
    aluminiumStrands: "6 × 4.72 mm",
    steelStrands: "1 × 4.72 mm",
    description: "33–66 kV overhead line"
  },
  {
    id: "wolf",
    name: "Wolf",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 18.13,
    aluminiumArea: 150,
    totalArea: 194.9,
    weightPerKm: 727,
    resistance20: 0.182,
    ampacity: 470,
    aluminiumStrands: "30 × 2.59 mm",
    steelStrands: "7 × 2.59 mm",
    description: "Sub-transmission conductor"
  },
  {
    id: "panther",
    name: "Panther",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 21.00,
    aluminiumArea: 200,
    totalArea: 261.5,
    weightPerKm: 976,
    resistance20: 0.139,
    ampacity: 560,
    aluminiumStrands: "30 × 3.00 mm",
    steelStrands: "7 × 3.00 mm",
    description: "132 kV transmission conductor"
  },
  {
    id: "kundah",
    name: "Kundah",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 26.88,
    aluminiumArea: 300,
    totalArea: 329,
    weightPerKm: 1282,
    resistance20: 0.094,
    ampacity: 700,
    aluminiumStrands: "54 × 2.67 mm",
    steelStrands: "7 × 2.67 mm",
    description: "220 kV transmission conductor"
  },
  {
    id: "zebra",
    name: "Zebra",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 28.62,
    aluminiumArea: 400,
    totalArea: 484.5,
    weightPerKm: 1621,
    resistance20: 0.068,
    ampacity: 860,
    aluminiumStrands: "54 × 3.18 mm",
    steelStrands: "7 × 3.18 mm",
    description: "220–400 kV transmission"
  },
  {
    id: "moose",
    name: "Moose",
    family: "ACSR",
    material: "Aluminium + Steel",
    diameter: 31.77,
    aluminiumArea: 520,
    totalArea: 597,
    weightPerKm: 1998,
    resistance20: 0.054,
    ampacity: 980,
    aluminiumStrands: "54 × 3.53 mm",
    steelStrands: "7 × 3.53 mm",
    description: "EHV transmission conductor"
  },

  // ---------- AAAC ----------
  {
    id: "aaac120",
    name: "AAAC 120",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 15.2,
    aluminiumArea: 120,
    totalArea: 120,
    weightPerKm: 332,
    resistance20: 0.225,
    ampacity: 350,
    aluminiumStrands: "19 strands",
    description: "AAAC distribution conductor"
  },
  {
    id: "aaac150",
    name: "AAAC 150",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 16.9,
    aluminiumArea: 150,
    totalArea: 150,
    weightPerKm: 415,
    resistance20: 0.180,
    ampacity: 410,
    aluminiumStrands: "19 strands",
    description: "AAAC medium conductor"
  },
  {
    id: "aaac232",
    name: "AAAC 232",
    family: "AAAC",
    material: "All Aluminium Alloy",
    diameter: 21.0,
    aluminiumArea: 232,
    totalArea: 232,
    weightPerKm: 642,
    resistance20: 0.116,
    ampacity: 560,
    aluminiumStrands: "37 strands",
    description: "AAAC transmission conductor"
  },

  // ---------- AAC ----------
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
    ampacity: 220,
    aluminiumStrands: "7 strands",
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
    ampacity: 340,
    aluminiumStrands: "19 strands",
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
    ampacity: 430,
    aluminiumStrands: "37 strands",
    description: "High-capacity AAC conductor"
  }
];

// Useful helper
export const getConductorById = (id: string) =>
  conductors.find(c => c.id === id);
