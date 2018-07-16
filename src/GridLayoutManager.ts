import {
  Dimension,
  Layout,
  WrapGridLayoutManager,
} from "recyclerlistview";
import GridLayoutProvider from "./GridLayoutProvider";
export default class GridLayoutManager extends WrapGridLayoutManager {
  private _maxSpan: number;
  private _getSpanForIndex: (index: number) => number;
  private _isGridHorizontal: boolean | undefined;
  private _renderWindowSize: Dimension;
  constructor(
    layoutProvider: GridLayoutProvider,
    renderWindowSize: Dimension,
    getSpanForIndex: (index: number) => number,
    maxSpan: number,
    isHorizontal?: boolean,
    cachedLayouts?: Layout[],
  ) {
    super(layoutProvider, renderWindowSize, isHorizontal, cachedLayouts);
    this._getSpanForIndex = getSpanForIndex;
    this._isGridHorizontal = isHorizontal;
    this._renderWindowSize = renderWindowSize;
    if (maxSpan === 0) {
      throw new Error("Max Column Span cannot be 0 or undefined");
    } else {
      this._maxSpan = maxSpan;
    }
  }

  public getStyleOverridesForIndex(index: number): object | undefined {
    const columnSpanForIndex = this._getSpanForIndex(index);
    return this._isGridHorizontal
      ? {
          height:
            (this._renderWindowSize.height / this._maxSpan) * columnSpanForIndex,
        }
      : {
          width:
            (this._renderWindowSize.width / this._maxSpan) * columnSpanForIndex,
        };
  }
}
