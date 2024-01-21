import { QRCode } from "@prisma/client";

export type GeneratedQRCode = Omit<QRCode, "createdAt"> & {
  createdAt: string;
  productDeleted: boolean;
  productTitle: string;
  productImage: string;
  productAlt: string;
  destinationUrl: string;
  image: string;
};

export type QRCodeFormState = Partial<GeneratedQRCode> & {
  productVariantId: string | undefined;
  productAlt: string | undefined;
};
