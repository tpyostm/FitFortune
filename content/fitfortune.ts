export type Recommendation = {
  label: string;
  src: string;
};

export type ExerciseStep = {
  lines: readonly string[];
  pose: string;
};

export type ExerciseContent = {
  name: string;
  stepHeading: string;
  instruction: string;
  durationSec: number;
  idlePose: string;
  activePoses: readonly string[];
  steps: readonly ExerciseStep[];
};

export const equipmentRecommendations: readonly Recommendation[] = [
  { label: "ร่างกาย", src: "/assets/recommendations/Rec1.png" },
  { label: "หัวใจ", src: "/assets/recommendations/Rec2.png" },
  { label: "วิญญาณ", src: "/assets/recommendations/Rec3.png" },
];

const mainPoses = {
  idle: "/assets/poses/Post1.png",
  front: "/assets/poses/Post2.png",
  back: "/assets/poses/Post3.png",
  alternate: "/assets/poses/Post4.png",
} as const;

const challengePose = "/assets/mascot/Mascot6.png";

export const exercises = {
  main: {
    name: "ยืดไหล่คลายตึง",
    stepHeading: "ท่าหมุนไหล่ (ทำตามง่ายๆ)",
    instruction: "หมุนไหล่ช้า ๆ ตามลำดับ หายใจสม่ำเสมอ และหยุดทันทีหากรู้สึกเจ็บ",
    durationSec: 30,
    idlePose: mainPoses.idle,
    activePoses: [mainPoses.front, mainPoses.back, mainPoses.alternate, mainPoses.back],
    steps: [
      { lines: ["วงไปด้านหน้า", "10 ครั้ง"], pose: mainPoses.front },
      { lines: ["วงไปด้านหลัง", "10 ครั้ง"], pose: mainPoses.back },
      { lines: ["สลับข้าง", "ทำครบ 2 เซ็ต"], pose: mainPoses.alternate },
    ],
  },
  challenge: {
    name: "Plank แตะไหล่",
    stepHeading: "ทำ Plank แตะไหล่ (ค่อย ๆ ทำ)",
    instruction: "ตั้งท่าแพลงก์ เกร็งแกนกลาง แล้วแตะไหล่สลับซ้ายขวาช้า ๆ พยายามให้สะโพกนิ่ง",
    durationSec: 30,
    idlePose: challengePose,
    activePoses: [challengePose],
    steps: [
      { lines: ["ตั้งท่า Plank", "มือใต้หัวไหล่"], pose: challengePose },
      { lines: ["แตะไหล่ซ้าย-ขวา", "สลับกัน"], pose: challengePose },
      { lines: ["เกร็งลำตัว", "ทำต่อเนื่อง"], pose: challengePose },
    ],
  },
} as const satisfies Record<"main" | "challenge", ExerciseContent>;

export const poseFrameIntervalMs = 700;
