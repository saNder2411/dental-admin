// Types
import { InferValueTypes } from '../_sections/Grid/GridTypes';
// Actions
import * as actions from './TeamStaffAC';

export interface APITeamStaffDataItem {
  __metadata: {
    etag: string;
    id: string;
    type: string;
    uri: string;
  };
  Id: number;
  Title: string;
  FirstName: string;
  FullName: string;
  TeamProfilePhoto: {
    __metadata: { type: string };
    Description: string;
    Url: string;
  };
  ShowOnline: boolean;
  Email: string;
  CellPhone: string;
  JobTitle: string;
  Department: null | string;
  ProfilesStatus: string;
  WorkingWeekDays: null | string;
  CalendarColour: string;
  CalendarColHex: string;
  ID: number;

  RoleSkills: null | string[];
  Gender: null | '(2) Male' | '(1) Female';
  id: number;
}

export interface TeamStaffDataItem extends APITeamStaffDataItem {
  TeamProfilePhotoUrl: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface TeamStaffTeamData {
  teamID: number;
  teamName: string;
  managerName: string;
  teamColor: string;
  photo: string;
  jobTitle: string;
  managerID: number;
}

export interface TeamStaffState {
  isDataLoading: boolean;
  data: TeamStaffDataItem[];
  dataError: string;
  isDataItemLoading: boolean;
  dataItemError: string;
  isValidFullNameField: boolean;
  isValidJobTitleField: boolean;
  isValidMobilePhoneField: boolean;
}

export const ActionTypes = {
  FETCH_DATA_INIT_ASYNC: 'STAFF/FETCH_DATA_INIT_ASYNC' as const,
  FETCH_DATA_REQUEST: `STAFF/FETCH_DATA_REQUEST` as const,
  FETCH_DATA_SUCCESS: `STAFF/FETCH_DATA_SUCCESS` as const,
  FETCH_DATA_FAILURE: `STAFF/FETCH_DATA_FAILURE` as const,
  FETCH_DATA_FINALLY: `STAFF/FETCH_DATA_FINALLY` as const,
  CREATE_DATA_ITEM_INIT_ASYNC: 'STAFF/CREATE_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_DATA_ITEM_REQUEST: `STAFF/CREATE_DATA_ITEM_REQUEST` as const,
  CREATE_DATA_ITEM_SUCCESS: `STAFF/CREATE_DATA_ITEM_SUCCESS` as const,
  CREATE_DATA_ITEM_FAILURE: `STAFF/CREATE_DATA_ITEM_FAILURE` as const,
  CREATE_DATA_ITEM_FINALLY: `STAFF/CREATE_DATA_ITEM_FINALLY` as const,
  UPDATE_DATA_ITEM_INIT_ASYNC: 'STAFF/UPDATE_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_DATA_ITEM_REQUEST: `STAFF/UPDATE_DATA_ITEM_REQUEST` as const,
  UPDATE_DATA_ITEM_SUCCESS: `STAFF/UPDATE_DATA_ITEM_SUCCESS` as const,
  UPDATE_DATA_ITEM_FAILURE: `STAFF/UPDATE_DATA_ITEM_FAILURE` as const,
  UPDATE_DATA_ITEM_FINALLY: `STAFF/UPDATE_DATA_ITEM_FINALLY` as const,
  DELETE_DATA_ITEM_INIT_ASYNC: 'STAFF/DELETE_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_DATA_ITEM_REQUEST: `STAFF/DELETE_DATA_ITEM_REQUEST` as const,
  DELETE_DATA_ITEM_SUCCESS: `STAFF/DELETE_DATA_ITEM_SUCCESS` as const,
  DELETE_DATA_ITEM_FAILURE: `STAFF/DELETE_DATA_ITEM_FAILURE` as const,
  DELETE_DATA_ITEM_FINALLY: `STAFF/DELETE_DATA_ITEM_FINALLY` as const,
  VALIDATE_FULL_NAME_FIELD: `STAFF/VALIDATE_FULL_NAME_FIELD` as const,
  VALIDATE_JOB_TITLE_FIELD: `STAFF/VALIDATE_JOB_TITLE_FIELD` as const,
  VALIDATE_MOBILE_PHONE_FIELD: `STAFF/VALIDATE_MOBILE_PHONE_FIELD` as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type CreateDataItemInitAsyncActionType = ReturnType<typeof actions.createDataItemInitAsyncAC>;

export type UpdateDataItemInitAsyncActionType = ReturnType<typeof actions.updateDataItemInitAsyncAC>;

export type DeleteDataItemInitAsyncActionType = ReturnType<typeof actions.deleteDataItemInitAsyncAC>;
