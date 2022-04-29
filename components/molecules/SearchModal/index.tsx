import { Palette, SearchOffOutlined, SearchOutlined } from '@mui/icons-material'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Input,
  InputAdornment,
  Button,
  useTheme
} from '@mui/material'
import { style } from '@mui/system'
import { closeSearchModal } from '@redux/slices/uiSlice'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'

interface SearchModalProps {
  // name?: string;
}

// TODO: falta agregar la funcionalidad de buscar
export const SearchModal: FC<SearchModalProps> = () => {
  const { palette } = useTheme()
  const { isSearchModalOpen } = useSelector((state: RootState) => state.uiState)
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleCloseModal = () => {
    dispatch(closeSearchModal())
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
        <TextField
          id="input-with-icon-textfield"
          label="Buscar producto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
          variant="outlined"
          helperText="Presione enter o el boton buscar"
          value={inputText}
          onChange={handleChange}
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
            sx={{
              color: palette.primary[50]
            }}
          >
            Buscar producto
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
