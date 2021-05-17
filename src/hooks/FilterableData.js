import { useState, useMemo } from "react";

const useFilterableData = (items, config) => {
  const [filterConfig, setFilterConfig] = useState(config);

  const filteredItems = useMemo(() => {
    let filterableItems = [];
    if (filterConfig !== null) {
      filterableItems = items.filter((item) => {
        for (var i in filterConfig.fields) {
          const field = filterConfig.fields[i];
          if (
            item[field] !== undefined &&
            item[field].toLowerCase().includes(filterConfig.key.toLowerCase())
          )
            return true;
        }
        return false;
      });
    }
    return filterableItems;
  }, [items, filterConfig]);

  const requestFilter = (key) => {
    setFilterConfig({ key: key, fields: filterConfig.fields });
  };

  return { filteredItems, requestFilter, filterConfig };
};

export default useFilterableData;
