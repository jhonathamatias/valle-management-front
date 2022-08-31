import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Grid, { GridProps } from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileProps extends File {
  preview: string;
}

interface InputFileUploadProps {
  onChangeFile: (file: File) => void;
  error?: boolean;
  helperText?: string;
  defaultValue?: File;
}

interface DropzoneWrapperProps extends GridProps {
  dragging?: boolean;
  error?: string;
}

const DropzoneWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "dragging",
})<DropzoneWrapperProps>(({ theme, dragging, error = "false" }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  display: 'flex',
  height: '195px',
  cursor: 'pointer',
  marginBottom: 2,
  borderColor: error === 'true' ? theme.palette.error.main : theme.palette.divider,
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[50],
    "& > p": {
      color: theme.palette.primary.main
    },
    "& > svg": {
      color: theme.palette.primary.main
    }
  },

  ...(dragging && {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[50]
  }),
}));

export default function InputFileUpload({
  onChangeFile,
  error = false,
  helperText,
  defaultValue
}: InputFileUploadProps) {
  const theme = useTheme();
  const [files, setFiles] = useState<FileProps[]>([]);
  const [dragging, setDragging] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },

    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    onDragOver: () => {
      setDragging(true);
    },
    onDragLeave: () => {
      setDragging(false);
    },
    onDropAccepted: () => {
      setDragging(false);
    },
    maxFiles: 1
  });

  useEffect(() => {
    onChangeFile(files[0]);
  }, [files, onChangeFile]);

  useEffect(() => {
    if (defaultValue) {
      setFiles([
        Object.assign(defaultValue, {
          preview: URL.createObjectURL(defaultValue)
        })
      ]);
    }
  }, [defaultValue]);

  const colorStyle = () => {
    if (dragging) {
      return theme.palette.primary.main;
    }

    if (error) {
      return theme.palette.error.main;
    }

    return theme.palette.text.disabled;
  };

  return (
    <Grid
      container
    >
      {(files.length > 0) &&
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: '20rem',
            color: theme.palette.text.secondary
          }}
        >
          <Typography noWrap variant="body2" gutterBottom>
            {files[0].name}
          </Typography>
        </div>
      }
      <DropzoneWrapper
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        dragging={dragging}
        {...getRootProps({ className: 'dropzone' })}
        error={(error && files.length === 0) ? "true" : "false"}
      >
        <input {...getInputProps()} />

        {!files.length &&
          <>
            <UploadFileIcon
              sx={{
                color: colorStyle(),
                fontSize: 50,
                marginBottom: 2
              }}
            />
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                color: colorStyle()
              }}
            >
              Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos
            </Typography>
          </>
        }
        {(files.length > 0) &&
          <Grid
            item
            xs={4}
            component="div"
            title={files[0].name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              margin: 1
            }}>
            <img
              src={files[0].preview}
              alt="" style={{
                width: '100%',
                height: '150px',
              }} />
          </Grid>
        }
      </DropzoneWrapper>
      {(files.length > 0) &&
        <Grid item display="flex">
          <IconButton
            onClick={() => setFiles([])}
          >
            <DeleteIcon color='error' />
          </IconButton>
        </Grid>
      }
      {(error && (files.length === 0)) &&
        <Typography variant="caption" color="error" style={{ marginLeft: '14px', marginTop: '3px' }}>
          {helperText}
        </Typography>
      }
    </Grid>
  );
}