export interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

export const menuData: MenuItem[] = [
  {
    title: "MIDAS",
    children: [
      { title: "MIDAS의 특별함", href: "#" },
      { title: "원장소개", href: "#" },
      { title: "진료안내 및 예약", href: "#" },
      { title: "한의원 공간 소개", href: "#" },
    ],
  },
  {
    title: "안면·두상 교정",
    children: [
      { title: "안면비대칭 교정", href: "#" },
      { title: "두상 교정", href: "#" },
    ],
  },
  {
    title: "한방성형·뷰티",
    children: [
      { title: "리프팅·채움 매선", href: "#" },
      { title: "뷰티 약침", href: "#" },
      { title: "다이어트", href: "#" },
    ],
  },
  {
    title: "체형교정",
    children: [
      { title: "체형교정", href: "#" },
      { title: "거북목", href: "#" },
      { title: "라운드숄더", href: "#" },
      { title: "측만", href: "#" },
    ],
  },
  {
    title: "자동차보험·통증",
    children: [
      { title: "교통사고 후유증 치료", href: "#" },
      { title: "통증치료", href: "#" },
    ],
  },
  {
    title: "수험생·소아",
    children: [
      { title: "소아", href: "#" },
      { title: "수험생 추나 & 한약", href: "#" },
      { title: "불안·불면", href: "#" },
    ],
  },
  {
    title: "피부안면",
    children: [
      { title: "피부질환", href: "#" },
      { title: "안면마비", href: "#" },
    ],
  },
  {
    title: "리뷰",
    href: "#",
  },
];
