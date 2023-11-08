import { useTable } from "@refinedev/antd";
import {
  BaseRecord,
  HttpError,
  CrudFilter,
  CrudFilters,
} from "@refinedev/core";

import { IPagination, ISearch } from "../../interfaces";
import { useEffect, useState } from "react";

interface IProps {
  filters?: {
    initial?: CrudFilters | undefined;
  };
}

export const useCustomTable = <T extends BaseRecord>(props?: IProps) => {
  const [list, setList] = useState<T[]>([]);
  const { tableQueryResult, ...rest } = useTable<T, HttpError, ISearch>({
    filters: {
      defaultBehavior: "replace",
      ...props?.filters,
    },
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
    onSearch: (values) => {
      const filter: CrudFilter[] = [];
      const { name, title, ...rest } = values;
      if (name !== undefined) {
        filter.push({
          field: "name",
          operator: "contains",
          value: values.name,
        });
      }

      if (title !== undefined) {
        filter.push({
          field: "title",
          operator: "contains",
          value: values.title,
        });
      }

      Object.keys(rest).forEach((key) => {
        const value = (rest as any)[key];
        if (value !== undefined) {
          filter.push({
            field: key as any,
            operator: "eq",
            value: value,
          });
        }
      });

      console.log(filter);

      return filter;
    },
    syncWithLocation: true,
  });

  const total = tableQueryResult.data?.total;
  const data = tableQueryResult.data?.data ?? [];

  useEffect(() => {
    setList(data);
  }, [data]);

  return {
    ...rest,
    tableQueryResult,
    data: list,
    setList,
    count: total,
  };
};
