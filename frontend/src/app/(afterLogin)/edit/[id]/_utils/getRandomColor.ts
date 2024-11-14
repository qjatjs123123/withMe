// util/getRandomColor.ts

const COLORS = [
  // 빨간계열
  '#FF6B6B', // 연한 빨간색
  '#FF8787', // 살몬핑크
  '#FFA8A8', // 연한 핑크

  // 주황계열
  '#FFA07A', // 연한 주황
  '#FFB38A', // 피치색
  '#FFD1B8', // 연한 살구색

  // 노란계열
  '#FFD93D', // 밝은 노란색
  '#FFF3B0', // 파스텔 노란색
  '#FFFACD', // 레몬색

  // 초록계열
  '#98FB98', // 연한 초록
  '#90EE90', // 라이트 그린
  '#B5EAD7', // 민트색

  // 파란계열
  '#87CEEB', // 하늘색
  '#ADD8E6', // 연한 파란색
  '#B8E8FF', // 밝은 하늘색

  // 보라계열
  '#DCD0FF', // 연한 보라
  '#E0B0FF', // 밝은 보라
  '#DABFFF', // 라벤더

  // 분홍계열
  '#FFB5E8', // 파스텔 핑크
  '#FFC4E1', // 연한 분홍
  '#FFE4E1', // 미스티 로즈
];

export const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};
