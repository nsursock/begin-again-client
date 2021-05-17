import { useState, useMemo } from "react";

const usePaginableData = (items, config) => {
  const [pageConfig, setPageConfig] = useState(config);

  const paginatedItems = useMemo(() => {
    let paginableItems = [];
    if (pageConfig !== null) {
      paginableItems = items.slice(
        pageConfig.selectedPage * pageConfig.pageSize,
        (pageConfig.selectedPage + 1) * pageConfig.pageSize
      );
    }
    return paginableItems;
  }, [items, pageConfig]);

  const requestPage = (page, size) => {
    setPageConfig({ selectedPage: page, pageSize: size });
  };

  return { paginatedItems, requestPage, pageConfig };
};

export default usePaginableData;
