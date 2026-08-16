export type ExerciseContent = {
  name: string;
  instruction: string;
  durationSec: number;
  materials: { name: string; icon: string }[];
  mascot: string;
};

export const dailyFortune = {
  fortuneTitle: "ร่างกายกำลังบอกว่า... ขอพักไหล่นิดนึง",
  fortuneBody: "วันนี้พลังดีมีมาเต็ม แต่ช่วงคอและไหล่อาจตึงแบบไม่รู้ตัว ยืดเบา ๆ แล้วทุกอย่างจะไหลลื่นขึ้น",
  healthFocusArea: "คอ • บ่า • ไหล่",
  shareWarningText: "ขยับก่อน แล้วดวงจะปังกว่าเดิม ✦",
  mainExercise: {
    name: "ยืดไหล่คลายตึง",
    instruction: "ยกแขนพาดอก ใช้อีกแขนดึงเข้าหาตัวเบา ๆ สลับข้างเมื่อผ่านไป 15 วินาที",
    durationSec: 30,
    materials: [
      { name: "เสื่อโยคะ", icon: "▰" },
      { name: "ผ้าขนหนู", icon: "▱" },
      { name: "น้ำดื่ม", icon: "●" },
    ],
    mascot: "/assets/mascot/Mascot3.png",
  },
  challengeExercise: {
    name: "Plank แตะไหล่",
    instruction: "ตั้งท่าแพลงก์ เกร็งแกนกลาง แล้วแตะไหล่สลับซ้ายขวาช้า ๆ พยายามให้สะโพกนิ่ง",
    durationSec: 30,
    materials: [
      { name: "เสื่อโยคะ", icon: "▰" },
      { name: "ดัมเบลเบา (ถ้ามี)", icon: "●—●" },
      { name: "ยางยืดออกกำลังกาย", icon: "∞" },
    ],
    mascot: "/assets/mascot/Mascot6.png",
  },
};

export function getThaiDayLabel(date = new Date()) {
  return new Intl.DateTimeFormat("th-TH", { weekday: "long" }).format(date);
}
