import React from 'react';
import { PixelPreview } from './components/pixel-preview/PixelPreview';
import { PixelPalet } from './components/pixel-palet/PixelPalet';
import Container from './components/container/container';
import './App.css';
// import logo from './logo.svg';

const SIDE_LEN = 15;
const OFFSET_OUT_PICTURE = 0;

export type Pixel = string;

type AppState = {
  matrixPalet: (Pixel | null)[][],
  matrixPreview: Pixel[][],
  matrixHorisontal: number,
  matrixVertical: number,
  padding: number,
}

class App extends React.Component<{}, AppState> {

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
      <div className="App">
        <header className="App-header">LED Matrix</header>

        <main className="App-main">
          <div className="matrix-panel">
            {
              this.isNoneEmptyPreviewMatrix &&
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
            }
          </div>

          <div className="preview-panel">
            {
              this.isNoneEmptyPreviewMatrix &&
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
            }
          </div>
        </main>
      </div >
    )
  }

}

export default App;



class ColorMatrix {
  /**
   * Transform matrix by replacing empty pixel on transparent color
   * @param matrix 
   */
  static colorEmptyPixels(matrix: (Pixel | null)[][]): Pixel[][] {
    return matrix.map(row => {
      return row.map(collCell => {
        if (collCell === null) {
          return '0,0,0,0';
        }

        return collCell;
      })
    });
  }

  static getTemplates(): PresetMatrix {
    return new PresetMatrix();
  }
}

class PresetMatrix {
  marioBrother(isMario = true): (Pixel | null)[][] {

    const mainColor = (isMario) ? "255, 0, 0" : "0, 180, 0";

    const C = mainColor;        //Hat & Shirt
    const B = "100, 50, 0";     //Brown Hair & Boots
    const S = "255, 200, 150";  //Skin Tone
    const O = "0, 0, 255";      //Blue Overalls
    const Y = "255, 255, 0";    //Yellow Buckles
    const W = "255, 255, 255";  //White Gloves
    // const _ = "0, 0, 0, 0";     //Transparent (RGBA Format)
    const _ = null;     //Transparent (RGBA Format)

    return [
      [_, _, _, C, C, C, C, C, _, _, _, _],
      [_, _, C, C, C, C, C, C, C, C, C, _],
      [_, _, B, B, B, S, S, B, S, _, _, _],
      [_, B, S, B, S, S, S, B, S, S, S, _],
      [_, B, S, B, B, S, S, S, B, S, S, B],
      [_, B, B, S, S, S, S, B, B, B, B, _],
      [_, _, _, S, S, S, S, S, S, S, _, _],
      [_, _, C, C, O, C, C, C, C, _, _, _],
      [_, C, C, C, O, C, C, O, C, C, C, _],
      [C, C, C, C, O, O, O, O, C, C, C, C],
      [W, W, C, O, Y, O, O, Y, O, C, W, W],
      [W, W, W, O, O, O, O, O, O, W, W, W],
      [W, W, O, O, O, O, O, O, O, O, W, W],
      [_, _, O, O, O, _, _, O, O, O, _, _],
      [_, B, B, B, _, _, _, _, B, B, B, _],
      [B, B, B, B, _, _, _, _, B, B, B, B]
    ];
  }
}