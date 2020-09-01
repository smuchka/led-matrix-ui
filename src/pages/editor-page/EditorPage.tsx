import React, { useEffect, useState } from 'react';
import Container from '../../components/container/container';
import { PixelPalet } from '../../components/pixel-palet/PixelPalet';
import { PixelPreview } from '../../components/pixel-preview/PixelPreview';
import { ColorMatrix, Pixel } from '../../helpers';
import './EditorPage.css';
import { RouteComponentProps } from 'react-router-dom';
import { PARAM_EDITOR_TEMPLATE } from '../../helpers/constants';

const SIDE_LEN = 15;
const OFFSET_OUT_PICTURE = 80;

export const EditorPage: React.FC<RouteComponentProps<any>> = (props) => {

  const [editorMatrix, setEditorMatrix] = useState<(Pixel | null)[][]>([[]]);
  const [previewMatrix, setPreviewMatrix] = useState<Pixel[][]>([[]]);
  const [matrixDimentios, setMatrixDimentios] = useState<[number, number]>([SIDE_LEN, SIDE_LEN])
  const padding = OFFSET_OUT_PICTURE;

  const isNoneEmptyPreviewMatrix = () => {
    if ((previewMatrix && previewMatrix.length)) {
      return (previewMatrix[0] && previewMatrix[0].length)
    }

    return false;
  }

  useEffect(() => {

    let palletData = null;
    const templateName = props.match.params[PARAM_EDITOR_TEMPLATE] || '';

    if (templateName === 'mario') {
      palletData = ColorMatrix.getTemplates().marioBrother(true);
    } else if (templateName === 'mario-green') {
      palletData = ColorMatrix.getTemplates().marioBrother(false);
    }

    if (palletData) {
      const preview = ColorMatrix.colorEmptyPixels(palletData)

      setEditorMatrix(palletData)
      setPreviewMatrix(preview)
    }
    setMatrixDimentios([SIDE_LEN, SIDE_LEN])
  }, [props])

  const [columns, rows] = matrixDimentios;

  if (!isNoneEmptyPreviewMatrix()) {
    return null;
  }

  return (
    <>
      <div className="matrix-panel">
        <Container>
          {({ width, height }) => {

            return width && height && (
              <PixelPalet
                matrix={editorMatrix as string[][]}
                columns={columns}
                rows={rows}
                padding={padding}
                width={width}
                height={height}
              ></PixelPalet>)
          }
          }
        </Container>
      </div>

      <div className="preview-panel">
        <Container>
          {({ width, height }) => {

            return width && height && (
              <PixelPreview
                matrix={previewMatrix}
                horisontal={columns}
                padding={padding}
                width={width}
                height={height}
              />)
          }
          }
        </Container>
      </div>
    </>
  )
}

