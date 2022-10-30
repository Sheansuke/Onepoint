import { useCallback, useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState<number>(1)

  const changePage = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage]
  )

  const nextPage = useCallback(() => {
    setPage(page + 1)
  }, [page])

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  return {
    page,
    changePage,
    nextPage,
    previousPage
  }
}
