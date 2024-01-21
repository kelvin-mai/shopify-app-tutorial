import { EmptyState } from '@shopify/polaris';

type QREmptyProps = {
  onAction(): void;
};

export const QREmpty: React.FC<QREmptyProps> = ({ onAction }) => (
  <EmptyState
    heading='Create unique QR codes for your product'
    action={{
      content: 'Create QR code',
      onAction,
    }}
    image='https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
  >
    <p>Allow customers to scan codes and buy products using their phones.</p>
  </EmptyState>
);
