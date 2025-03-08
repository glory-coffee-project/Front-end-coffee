import { Grid, Navigation, Pagination } from 'swiper/modules';

/**
 * Swiper 설정을 생성하는 함수
 * @param gridRows 그리드 행 수
 * @returns Swiper 설정 객체
 */
export const createSwiperConfig = (gridRows: number) => ({
  modules: [Navigation, Pagination, Grid],
  navigation: true,
  pagination: { clickable: true },
  className: 'w-full h-[calc(100%-105px)]',
  grid: {
    rows: gridRows,
    fill: 'row' as const,
  },
  breakpoints: {
    // 모바일 (기본)
    0: {
      slidesPerView: 1,
      grid: {
        rows: gridRows,
        fill: 'row' as const,
      },
      spaceBetween: 10,
    },
    // 태블릿 (640px 이상)
    640: {
      slidesPerView: 2,
      grid: {
        rows: gridRows,
        fill: 'row' as const,
      },
      spaceBetween: 15,
    },
    // 중간 데스크탑 (768px 이상)
    768: {
      slidesPerView: 3,
      grid: {
        rows: gridRows,
        fill: 'row' as const,
      },
      spaceBetween: 20,
    },
    // 데스크탑 (1024px 이상)
    1024: {
      slidesPerView: 4,
      grid: {
        rows: gridRows,
        fill: 'row' as const,
      },
      spaceBetween: 25,
    },
    // 대형 디스플레이 (1280px 이상)
    1280: {
      slidesPerView: 5,
      grid: {
        rows: gridRows,
        fill: 'row' as const,
      },
      spaceBetween: 30,
    },
  },
});
