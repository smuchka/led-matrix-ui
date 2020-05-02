import React from 'react';
import Container from '../../components/container/container';
import { PixelPreview } from '../../components/pixel-preview/PixelPreview';
import { PixelPalet } from '../../components/pixel-palet/PixelPalet';
import { Pixel, ColorMatrix } from '../../helpers'
import './EditorPage.css';

const SIDE_LEN = 15;
const OFFSET_OUT_PICTURE = 80;

type EditorPageState = {
  matrixPalet: (Pixel | null)[][],
  matrixPreview: Pixel[][],
  matrixHorisontal: number,
  matrixVertical: number,
  padding: number,
}

class EditorPage extends React.Component<any, EditorPageState> {

  state = {
    padding: OFFSET_OUT_PICTURE,
    matrixHorisontal: SIDE_LEN,
    matrixVertical: SIDE_LEN,
    matrixPreview: [[]],
    matrixPalet: [[]],
  }

  get isNoneEmptyPreviewMatrix() {
    if ((this.state.matrixPreview && this.state.matrixPreview.length)) {
      return (this.state.matrixPreview[0] && this.state.matrixPreview[0].length)
    }

    return false;
  }

  componentDidMount = () => {
    this.load();
  }

  load = () => {
    const palletData = ColorMatrix.getTemplates().marioBrother(true);
    const preview = ColorMatrix.colorEmptyPixels(palletData)

    this.setState({
      matrixPalet: palletData,
      matrixPreview: preview,
      matrixHorisontal: SIDE_LEN,
      matrixVertical: SIDE_LEN,
    })
  }

  render() {

    const {
      matrixPalet,
      matrixPreview,
      matrixHorisontal,
      matrixVertical,
      padding,
    } = this.state;

    return (
      this.isNoneEmptyPreviewMatrix &&
      <React.Fragment>
        <div className="matrix-panel">
          <Container>
            {({ width, height }) => {

              return width && height && (
                <PixelPalet
                  matrix={matrixPalet}
                  columns={matrixHorisontal}
                  rows={matrixVertical}
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
                  matrix={matrixPreview}
                  horisontal={matrixHorisontal}
                  padding={padding}
                  width={width}
                  height={height}
                />)
            }
            }
          </Container>
        </div>
      </React.Fragment>
    )
  }

}

export default EditorPage;

