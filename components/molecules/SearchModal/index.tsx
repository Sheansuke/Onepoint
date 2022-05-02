import { SearchOutlined } from '@mui/icons-material'
import {
  Modal,
  Box,
  TextField,
  InputAdornment,
  Button,
  useTheme
} from '@mui/material'
import { closeSearchModal } from '@redux/slices/uiSlice'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'

interface SearchModalProps {
  // name?: string;
}

export const SearchModal: FC<SearchModalProps> = () => {
  const { palette } = useTheme()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm()

  const { isSearchModalOpen } = useSelector((state: RootState) => state.uiState)
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    clearErrors()
    reset()
    dispatch(closeSearchModal())
  }

  const handleSubmitForm = (data: { search: string }) => {
    router.push(`/search/${data.search}`).then(() => {
      handleCloseModal()
      reset()
      dispatch(closeSearchModal())
    })
  }

  return (
    <Modal
      open={isSearchModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 5,
          boxShadow: 24,
          width: '80%',
          maxWidth: '500px',
          p: 2
        }}
      >
        <form onSubmit={handleSubmit(handleSubmitForm)}  >
          <TextField
            id="input-with-icon-textfield"
            label="Buscar producto"
            {...register('search', {
              required: true
            })}
            InputProps={{
              autoComplete: 'off',
              autoFocus: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
            variant="outlined"
            helperText="Presione enter o el boton buscar"
            error={errors.search ? true : false}
            sx={{
              width: '100%'
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2
            }}
          >
            <Button
              variant="text"
              sx={{
                color: palette.error.main,
                mr: 2
              }}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              sx={{
                color: palette.primary[50]
              }}
            >
              Buscar producto
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
