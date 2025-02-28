import { useQueryState } from "nuqs";

export function useFilters<T>(key: string, defaultValue: T) {
  const [filters, setFilters] = useQueryState<T>(key, {
    defaultValue,
    parse: (value) => {
      try {
        return JSON.parse(value) as T;
      } catch {
        return defaultValue;
      }
    },
    serialize: (value) => JSON.stringify(value),
  });

  return [filters, setFilters] as const;
}
