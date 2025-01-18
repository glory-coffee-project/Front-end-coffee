import { HttpResponse, http } from 'msw';

type StoreIdResponse = {
  store_id: string; // UUID
  name: string;
  address?: string;
};

type StoreIdDetailResponse = {
  date_info: DayInfo[];
};

type DayInfo = {
  day: number;
  day_info: DayDetailTransaction[];
};

type DayDetailTransaction = {
  transaction_id: string; // UUID
  type: 'expense' | 'income';
  category: string;
  detail: string;
  cost: number;
};

// id를 제외한 DayDetailTransaction 타입
type TransactionRequest = Omit<DayDetailTransaction, 'transaction_id'>;

type AddTransactionParams = {
  date: {
    year: number;
    month: number;
    day: number;
  };
} & TransactionRequest;

const STORE_IDS = {
  STORE_1: '0a6e3e2a-0bea-4cda-9f7d-9141ea5efa33',
  STORE_2: '1b7f4f3b-1cfb-5de4-0g8e-0252fb6efb44',
  STORE_3: 'a0b8035d-5499-4adb-9d8a-d7a93ac026e8',
};

const STORE_INFO: StoreIdResponse[] = [
  {
    store_id: STORE_IDS.STORE_1,
    name: '스토어 이름 1',
    address: '스토어 주소 1',
  },
  {
    store_id: STORE_IDS.STORE_2,
    name: '스토어 이름 2',
    address: '스토어 주소 2',
  },
  {
    store_id: STORE_IDS.STORE_3,
    name: '스토어 이름 3',
    address: '스토어 주소 3',
  },
];

const MOCK_STORE_ID_DETAIL: StoreIdDetailResponse[] = [
  {
    date_info: [
      {
        day: 1,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '교통비',
            detail: '서울 여행',
            cost: 30000,
          },
        ],
      },
      {
        day: 2,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 3,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 10,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '기타',
            detail: '친구랑 영화',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
    ],
  },
  {
    date_info: [
      {
        day: 21,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 23,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
      {
        day: 3,
        day_info: [
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'expense',
            category: '식비',
            detail: '친구랑 밥',
            cost: 30000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
          {
            transaction_id: crypto.randomUUID(),
            type: 'income',
            category: '급여',
            detail: '11월 급여',
            cost: 2000000,
          },
        ],
      },
    ],
  },
];

export const storeIdHandler = [
  // 스토어 이름, 주소 정보 조회
  http.get('/stores/:id', ({ params }) => {
    const store = STORE_INFO.find((store) => store.store_id === params.id);

    if (!store) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(store);
  }),

  // 스토어 상세 정보 조회 (달력 데이터)
  http.get('/stores/:id/calendar', ({ params, request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');

    if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
      return new HttpResponse(null, {
        status: 400,
        statusText: '유효하지 않은 년도 또는 월입니다.',
      });
    }

    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(storeDetail);
  }),

  // 특정 거래 정보 조회
  http.get('/stores/:id/transactions/:transactionId', ({ params }) => {
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    let transaction = null;
    storeDetail.date_info.some((dayInfo) => {
      transaction = dayInfo.day_info.find(
        (t) => t.transaction_id === params.transactionId
      );
      return transaction !== undefined;
    });

    if (!transaction) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '해당 거래를 찾을 수 없습니다.',
      });
    }

    return HttpResponse.json(transaction);
  }),

  // 스토어 지출, 수입 정보 추가
  http.post('/stores/:id/transactions', async ({ params, request }) => {
    const transactionData = (await request.json()) as AddTransactionParams;
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    const dayIndex = storeDetail.date_info.findIndex(
      (info) => info.day === transactionData.date.day
    );

    const newTransaction = {
      transaction_id: crypto.randomUUID(),
      type: transactionData.type,
      category: transactionData.category,
      detail: transactionData.detail,
      cost: transactionData.cost,
    };

    if (dayIndex === -1) {
      storeDetail.date_info.push({
        day: transactionData.date.day,
        day_info: [newTransaction],
      });
      storeDetail.date_info.sort((a, b) => a.day - b.day);
    } else {
      storeDetail.date_info[dayIndex].day_info.push(newTransaction);
    }

    return HttpResponse.json({
      success: true,
      message: '거래가 성공적으로 추가되었습니다.',
      data: newTransaction,
    });
  }),

  // 스토어 지출, 수입 정보 수정
  http.put(
    '/stores/:id/transactions/:transactionId',
    async ({ params, request }) => {
      const storeId = params.id as string;
      const transactionId = params.transactionId as string;
      const updateData = (await request.json()) as TransactionRequest;

      const storeDetail =
        MOCK_STORE_ID_DETAIL[
          STORE_INFO.findIndex((store) => store.store_id === storeId)
        ];

      if (!storeDetail) {
        return new HttpResponse(null, { status: 404 });
      }

      let isUpdated = false;
      storeDetail.date_info.forEach((dayInfo) => {
        const transactionIndex = dayInfo.day_info.findIndex(
          (t) => t.transaction_id === transactionId
        );

        if (transactionIndex !== -1) {
          dayInfo.day_info[transactionIndex] = {
            transaction_id: transactionId, // URL에서 받은 ID 사용
            ...updateData,
          };
          isUpdated = true;
        }
      });

      if (!isUpdated) {
        return new HttpResponse(null, {
          status: 404,
          statusText: '해당 거래를 찾을 수 없습니다.',
        });
      }

      return HttpResponse.json({
        success: true,
        message: '거래가 성공적으로 수정되었습니다.',
      });
    }
  ),

  // 스토어 지출, 수입 정보 삭제
  http.delete('/stores/:id/transactions/:transactionId', ({ params }) => {
    const storeDetail =
      MOCK_STORE_ID_DETAIL[
        STORE_INFO.findIndex((store) => store.store_id === params.id)
      ];

    if (!storeDetail) {
      return new HttpResponse(null, { status: 404 });
    }

    let isDeleted = false;
    storeDetail.date_info = storeDetail.date_info.filter((dayInfo) => {
      dayInfo.day_info = dayInfo.day_info.filter((transaction) => {
        if (transaction.transaction_id === params.transactionId) {
          isDeleted = true;
          return false;
        }
        return true;
      });
      return dayInfo.day_info.length > 0;
    });

    if (!isDeleted) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '해당 거래를 찾을 수 없습니다.',
      });
    }

    return HttpResponse.json({
      success: true,
      message: '거래가 성공적으로 삭제되었습니다.',
    });
  }),
];
