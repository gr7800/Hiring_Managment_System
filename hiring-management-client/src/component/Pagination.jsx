import { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Button2({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-sm text-lg font-normal transition-colors rounded-lg
      ${disabled && "text-rose-200 bg-gray-200 cursor-not-allowed"}
      ${active ? "bg-rose-500 text-white":"text-rose-500 bg-rose-200"}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

function PaginationNav1({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);
  return (
    <ul className="flex gap-2 items-center justify-center">
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.8rem" />
              <FaChevronLeft size="0.8rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageIndex - 1)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.8rem" />
              <FaChevronRight size="0.8rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
}

function Pagination({ pageCount, gotoPage, pageIndex }) {
  return (
    <div className="flex gap-4 flex-wrap p-6 py-8 items-center justify-center">
      <PaginationNav1
        gotoPage={gotoPage}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < pageCount - 1}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </div>
  );
}

export default Pagination;
