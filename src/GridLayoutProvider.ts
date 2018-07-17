
import { Dimension, Layout, LayoutProvider, LayoutManager } from "recyclerlistview";
import { GridLayoutManager } from "./GridLayoutManager";

export class GridLayoutProvider extends LayoutProvider {
  private _getHeightOrWidth: (index: number) => number;
  private _getSpan: (index: number) => number;
  private _maxSpan: number;
  private _renderWindowSize?: Dimension;
  private _isHorizontal?: boolean;

  constructor(
    maxSpan: number,
    getLayoutType: (index: number) => string | number,
    getSpan: (index: number) => number,
    // If horizonal return width while spans will be rowspans. Opposite holds true if not horizontal
    getHeightOrWidth: (index: number) => number,
  ) {
    super(
      getLayoutType,
      (type: string | number, dimension: Dimension, index: number) => {
        this.setLayout(dimension, index);
      },
    );
    this._getHeightOrWidth = getHeightOrWidth;
    this._getSpan = getSpan;
    this._maxSpan = maxSpan;
  }

  public newLayoutManager(renderWindowSize: Dimension, isHorizontal?: boolean, cachedLayouts?: Layout[]): LayoutManager {
    this._isHorizontal = isHorizontal;
    this._renderWindowSize = renderWindowSize;
    return new GridLayoutManager(this, renderWindowSize, this._getSpan, this._maxSpan, this._isHorizontal, cachedLayouts);
  }

  private setLayout(dimension: Dimension, index: number): void {
    const maxSpan: number = this._maxSpan;
    const itemSpan: number = this._getSpan(index);
    if (itemSpan > maxSpan) {
      throw new Error("Item span for index " + index + " is more than the max span");
    }
    if (this._renderWindowSize) {
      if (this._isHorizontal) {
        dimension.width = this._getHeightOrWidth(index);
        dimension.height = (this._renderWindowSize.height / maxSpan) * itemSpan;

      } else {
        dimension.height = this._getHeightOrWidth(index);
        dimension.width = (this._renderWindowSize.width / maxSpan) * itemSpan;
      }
    } else {
      throw new Error("setLayout called before layoutmanager was created, cannot be handled");
    }
  }
}
