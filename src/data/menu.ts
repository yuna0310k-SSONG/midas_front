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
      { title: "원장소개", href: "/midas/director" },
      { title: "진료안내 및 예약", href: "https://m.booking.naver.com/booking/13/bizes/670877?theme=place&entry=pll&lang=ko&area=pll" },
      { title: "한의원 공간 소개", href: "/midas/space" },
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
    title: "한방성형·뷰티",
    children: [
      { title: "리프팅·채움 매선", href: "/beauty/lifting" },
      { title: "뷰티 약침", href: "/beauty/acupuncture" },
      { title: "다이어트", href: "/beauty/diet" },
    ],
  },
  {
    title: "체형교정",
    children: [
      { title: "체형교정", href: "/posture/general" },
      { title: "거북목", href: "/posture/turtle-neck" },
      { title: "라운드숄더", href: "/posture/round-shoulder" },
      { title: "측만", href: "/posture/scoliosis" },
    ],
  },
  {
    title: "자동차보험·통증",
    children: [
      { title: "교통사고 후유증 치료", href: "/insurance/traffic" },
      { title: "통증치료", href: "/insurance/pain" },
    ],
  },
  {
    title: "수험생·소아",
    children: [
      { title: "소아", href: "/children/pediatric" },
      { title: "수험생 추나 & 한약", href: "/children/student" },
      { title: "불안·불면", href: "/children/anxiety" },
    ],
  },
  {
    title: "피부안면",
    children: [
      { title: "피부질환", href: "/skin/disease" },
      { title: "안면마비", href: "/skin/paralysis" },
    ],
  },
  {
    title: "리뷰",
    href: "/review",
  },
];
