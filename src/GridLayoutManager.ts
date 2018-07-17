import {
  Dimension,
  Layout,
  WrapGridLayoutManager,
  LayoutProvider,
} from "recyclerlistview";
export class GridLayoutManager extends WrapGridLayoutManager {
  private _maxSpan: number;
  private _getSpan: (index: number) => number;
  private _isGridHorizontal: boolean | undefined;
  private _renderWindowSize: Dimension;
  constructor(
    layoutProvider: LayoutProvider,
    renderWindowSize: Dimension,
    getSpan: (index: number) => number,
    maxSpan: number,
    isHorizontal?: boolean,
    cachedLayouts?: Layout[],
  ) {
    super(layoutProvider, renderWindowSize, isHorizontal, cachedLayouts);
    this._getSpan = getSpan;
    this._isGridHorizontal = isHorizontal;
    this._renderWindowSize = renderWindowSize;
    if (maxSpan <= 0) {
      throw new Error("Max Column Span cannot be less than or equal to 0");
    } else {
      this._maxSpan = maxSpan;
    }
  }

  public getStyleOverridesForIndex(index: number): object | undefined {
    const columnSpanForIndex = this._getSpan(index);
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
