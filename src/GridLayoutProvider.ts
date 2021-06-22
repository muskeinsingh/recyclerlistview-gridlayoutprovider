
import { Dimension, Layout, LayoutProvider, LayoutManager } from "recyclerlistview";
import { GridLayoutManager } from "./GridLayoutManager";

export class GridLayoutProvider extends LayoutProvider {
  private _getHeightOrWidth: (index: number) => number;
  private _getSpan: (index: number) => number;
  private _maxSpan: number;
  private _renderWindowSize?: Dimension;
  private _isHorizontal?: boolean;
  private _acceptableRelayoutDelta: number;
  private _isPreciseLayout?: boolean;
  constructor(
    maxSpan: number,
    getLayoutType: (index: number) => string | number,
    getSpan: (index: number) => number,
    // If horizonal return width while spans will be rowspans. Opposite holds true if not horizontal
    getHeightOrWidth: (index: number) => number,
    acceptableRelayoutDelta?: number,
    // temp variable for showing buckets using precise layout
    isPreciseLayout?: boolean
  ) {
    super(
      getLayoutType,
      (_: string | number, dimension: Dimension, index: number) => {
        this.setLayout(dimension, index);
      },
    );
    this._getHeightOrWidth = getHeightOrWidth;
    this._getSpan = getSpan;
    this._maxSpan = maxSpan;
    this._acceptableRelayoutDelta = ((acceptableRelayoutDelta === undefined) || (acceptableRelayoutDelta === null)) ? 1 : acceptableRelayoutDelta;
    this._isPreciseLayout = isPreciseLayout;
  }

  public newLayoutManager(renderWindowSize: Dimension, isHorizontal?: boolean, cachedLayouts?: Layout[]): LayoutManager {
    this._isHorizontal = isHorizontal;
    this._renderWindowSize = renderWindowSize;
    return new GridLayoutManager(this, renderWindowSize, this._getSpan, this._maxSpan, this._acceptableRelayoutDelta, this._isHorizontal, cachedLayouts);
  }

  private setLayout(dimension: Dimension, index: number): void {
    const maxSpan: number = this._maxSpan;
    const itemSpan: number = this._getSpan(index);
    if (itemSpan > maxSpan) {
      throw new Error("Item span for index " + index + " is more than the max span");
    }
    if (this._renderWindowSize) {
      if (this._isHorizontal) {
        const dimensionHeight = (this._renderWindowSize.height / maxSpan) * itemSpan;
        dimension.width = this._preciseDimensionValue(this._getHeightOrWidth(index));
        dimension.height = this._preciseIntDimensionValue(dimensionHeight);       
      } else {
        const dimensionWidth = (this._renderWindowSize.width / maxSpan) * itemSpan;
        dimension.height = this._preciseDimensionValue(this._getHeightOrWidth(index));
        dimension.width = this._preciseIntDimensionValue(dimensionWidth);
      }
    } else {
      throw new Error("setLayout called before layoutmanager was created, cannot be handled");
    }
  }

  private _preciseDimensionValue(value: number): number {
    return this._isPreciseLayout ? +value.toFixed(2) : value;
  }

  private _preciseIntDimensionValue(value : number) : number {
    return this._isPreciseLayout ? parseInt(value.toString().split(".")[0],10) : value;
  }
}
