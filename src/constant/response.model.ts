export interface ResponseModelWithData {
  status: number;
  error: false;
  data: any;
  message: string;
}
export interface ResponseModelWithDataWithCount {
  status: number;
  error: false;
  data: any;
  count: any;
  message: string;
}

export interface ResponseModelWithPageTotalResultAndLimit {
  status: number;
  error: false;
  data: any;
  total_page: number;
  total_result: number;
  limit: number;
  message: string;
}

export interface ResponseModelWithDataAbsen {
  status: number;
  error: false;
  jam_masuk: string;
  jam_keluar: string;
  shift_type: number;
  data: any;
  message: string;
}

export interface ResponseModelWithSchedule {
  status: number;
  error: false;
  data: any;
  users: any;
  message: string;
}

export interface ResponseModelWithDataUserActiveInactive {
  status: number;
  data: any;
  count: any;
  count_active: any;
  count_inactive: any;
  message: string;
  error: false;
}

export interface ResponseModelOnlyMessage {
  status: number;
  error: false;
  message: string;
}

export interface ResponseWhenError {
  status: number;
  error: true;
  message: string;
}

export interface ResponseModelWithToken {
  status: number;
  data: any;
  token: string;
  message: string;
  error: boolean;
}
