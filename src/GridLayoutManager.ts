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

  public overrideLayout(index: number, dim: Dimension): void {
    // we are doing this because - when we provide decimal dimensions for a
    // certain cell - the onlayout returns a different dimension in certain high end devices.
    // This causes the layouting to behave weirdly as the new dimension might not adhere to the spans and the cells arrange themselves differently
    // So, whenever we have layouts for a certain index, we explicitly override the dimension to those very layout values
    // and call super so as to set the overridden flag as true
    const layout = this.getLayouts()[index];
    if (layout) {
      if (this._isGridHorizontal) {
        dim.height = layout.height;
      } else {
        dim.width = layout.width;
      }
    }
    super.overrideLayout(index, dim);
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
