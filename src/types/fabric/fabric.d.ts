import "fabric";

declare module "fabric" {
  namespace fabric {
    interface Canvas {
      originalWidth?: number;
      originalHeight?: number;
    }
  }
}
