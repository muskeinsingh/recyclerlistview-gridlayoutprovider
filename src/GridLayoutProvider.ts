
import {Dimension, Layout, LayoutProvider, LayoutManager} from "recyclerlistview";
import GridLayoutManager from "./GridLayoutManager";
export default class GridLayoutProvider extends LayoutProvider {
  private _getDimensionForIndex: (index: number) => number;
  private _getSpanForIndex: (index: number) => number;
  private _setMaxSpan: () => number;
  private _renderWindowSize: Dimension | undefined;
  private _isHorizontal: boolean | undefined;
  constructor(
    getLayoutTypeForIndex: (index: number) => string | number,
    getDimensionForIndex: (index: number) => number,
    getSpanForIndex: (index: number) => number,
    setMaxSpan: () => number,
  ) {
    super(
      getLayoutTypeForIndex,
      (type: string | number, dimension: Dimension, index: number) => {
        this.setLayoutForTypeGrid(dimension, index);
      },
    );
    this._getDimensionForIndex = getDimensionForIndex;
    this._getSpanForIndex = getSpanForIndex;
    this._setMaxSpan = setMaxSpan;
  }

  public setLayoutForTypeGrid(dimension: Dimension, index: number): void {
    const maxSpan: number = this.setMaxSpan();
    const itemSpan: number = this.getSpanForIndex(index);
    if (itemSpan > maxSpan) {
      throw new Error("Item span for index " + index + " is more than the max span");
    }
    if (this._isHorizontal) {
      dimension.width = this.getDimensionForIndex(index);
      if (this._renderWindowSize) {
        dimension.height = (this._renderWindowSize.height / maxSpan) * itemSpan;
      }
    } else {
      dimension.height = this.getDimensionForIndex(index);
      if (this._renderWindowSize) {
        dimension.width = (this._renderWindowSize.width / maxSpan) * itemSpan;
      }
    }
  }

  public newLayoutManager(
    renderWindowSize: Dimension,
    isHorizontal?: boolean,
    cachedLayouts?: Layout[],
  ): LayoutManager {
    this._isHorizontal = isHorizontal;
    this._renderWindowSize = renderWindowSize;
    return new GridLayoutManager(
      this,
      renderWindowSize,
      this.getSpanForIndex,
      this.setMaxSpan(),
      this._isHorizontal,
      cachedLayouts,
    );
  }

  public setMaxSpan(): number {
    return this._setMaxSpan();
  }

  public getSpanForIndex(index: number): number {
    return this._getSpanForIndex(index);
  }

  public getDimensionForIndex(index: number): number {
    return this._getDimensionForIndex(index);
  }
}
