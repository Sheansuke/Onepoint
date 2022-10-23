import { Button } from '@atoms/Button'
import { closeSearchModal } from '@redux/slices/uiSlice'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { SearchIcon } from '@icons/SearchIcon'

export const SearchModal = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const router = useRouter()

  const { register, handleSubmit, clearErrors, reset } = useForm()

  const { isSearchModalOpen } = useSelector((state: RootState) => state.uiState)
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    clearErrors()
    reset()
    dispatch(closeSearchModal())
  }

  const handleSubmitForm = (data: { search: string }) => {
    setIsSearching(true)
    router.push(`/search/${data.search}`).then(() => {
      handleCloseModal()
      reset()
      dispatch(closeSearchModal())
      setIsSearching(false)
    })
  }

  if (!isSearchModalOpen) return

  return (
    <div className="modal modal-open ">
      <div className="modal-box absolute mb-96 ">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-control">
            <div className="input-group">
              <input
                autoFocus
                type="text"
                placeholder="Buscan producto"
                className="input input-bordered w-full"
                {...register('search', {
                  required: true
                })}
              />
              <Button
                arialLabel="search icon"
                type="submit"
                isLoading={isSearching}
                tailwindClass="btn btn-square border-none bg-main-primary text-main-50  hover:bg-main-700"
              >
                <SearchIcon />
              </Button>
            </div>

            <label className="label">
              <span className="label-text-alt">
                Presione enter o el boton de busqueda
              </span>
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end mt-4">
            <label
              htmlFor="searchModal"
              className="btn btn-ghost modal-button text-mainError-primary mr-4"
              onClick={handleCloseModal}
            >
              Cancelar
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
