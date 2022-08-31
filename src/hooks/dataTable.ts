import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../services/api";

export type ServerDataTableOptionsType = {
  dataSet: string;
  pathName: string;
  columns: GridColDef[];
  initialState?: GridInitialState;
};

export type ServerDataTableTreeDataValue = {
  columns: GridColDef[];
  initialState?: GridInitialState;
  rows: any[];
}

export type ServerDataTableReturnType = {
  data: ServerDataTableTreeDataValue
  refresh: Function;
};

export function useServerDataTable({
  pathName,
  dataSet,
  columns,
  initialState
}: ServerDataTableOptionsType): ServerDataTableReturnType {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getFieldsKey = (): string[] => {
    const keys: string[] = [];

    columns.forEach(column => {
      keys.push(column.field);
    });

    return keys;
  }

  const rowMap = (item: any) => {
    const colKeys = getFieldsKey();
    const row: any = {};

    colKeys.forEach(key => {
      if (item[key]) {
        row[key] = item[key];
      }
    });

    return row;
  }

  const getData = async () => {
    try {
      const newRows: any[] = [];
      const { data } = await api.get(pathName);

      data[dataSet].forEach((item: any) => {
        newRows.push(rowMap(item));
      });

      setRows(newRows);
    } catch (error) {
      setRows([]);
    }
  };

  const refresh = (): void => {
    getData();
  }

  const data = {
    columns,
    initialState,
    rows
  };

  return {data, refresh};
}