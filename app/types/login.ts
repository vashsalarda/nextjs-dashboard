// To parse this data:
//
//   import { Convert, LoginRes } from "./file";
//
//   const loginRes = Convert.toLoginRes(json);

export interface LoginRes {
  success?: boolean;
  data?: LoginResData;
  message?: string;
  token?: string;
}

export interface LoginResData {
  data?: UserData;
  success?: boolean;
}

export interface UserData {
  id?: string;
  session_token?: string;
  refresh_token?: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
  roles?: string[];
  designation?: string;
  designation_id?: string;
  branch_id?: string;
  station_id?: string;
  station_name?: string;
  withdrawal_limit?: string;
  temporary_password?: string;
  deposit_limit?: string;
  temporary_pin?: string;
  device_id?: string;
  revoked_access?: string;
  device_authenticator?: string;
  is_master?: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLoginRes(json: string): LoginRes {
    return JSON.parse(json);
  }

  public static loginResToJson(value: LoginRes): string {
    return JSON.stringify(value);
  }
}


