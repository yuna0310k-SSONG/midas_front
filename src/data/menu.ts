export interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

export const menuData: MenuItem[] = [
  {
    title: "MIDAS",
    href: "/midas/special",
    children: [
      { title: "MIDAS의 특별함", href: "/midas/special" },
      { title: "원장 소개", href: "/midas/director" },
      { title: "공간 소개", href: "/midas/space" },
      { title: "오시는길", href: "/midas/location" },
      { title: "진료 예약", href: "https://m.booking.naver.com/booking/13/bizes/670877?theme=place&entry=pll&lang=ko&area=pll" },
    ],
  },
  {
    title: "안면·두상 교정",
    children: [
      { title: "안면비대칭 교정", href: "/treatment/face-asymmetry" },
      { title: "두상 교정", href: "/treatment/skull" },
    ],
  },
  {
    title: "한방 성형",
    children: [
      { title: "리프팅·채움", href: "/beauty/lifting" },
      { title: "뷰티 약침", href: "/beauty/acupuncture" },
      { title: "다이어트", href: "/beauty/diet" },
    ],
  },
  {
    title: "체형 교정",
    children: [
      { title: "전체 체형 교정", href: "/posture/general" },
      { title: "거북목 교정", href: "/posture/turtle-neck" },
      { title: "라운드숄더 교정", href: "/posture/round-shoulder" },
      { title: "측만증 교정", href: "/posture/scoliosis" },
    ],
  },
  {
    title: "통증 치료",
    children: [
      { title: "교통사고 후유증", href: "/insurance/traffic" },
      { title: "통증 치료", href: "/insurance/pain" },
    ],
  },
  {
    title: "소아·청소년",
    children: [
      { title: "소아 한의원", href: "/children/pediatric" },
      { title: "수험생 건강관리", href: "/children/student" },
      { title: "불안·불면증", href: "/children/anxiety" },
    ],
  },
  {
    title: "피부 질환",
    children: [
      { title: "피부 질환 치료", href: "/skin/disease" },
      { title: "안면 마비 치료", href: "/skin/paralysis" },
    ],
  },
  {
    title: "리뷰",
    href: "/review",
  },
];
