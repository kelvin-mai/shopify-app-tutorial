import { Link } from '@remix-run/react';
import {
  IndexTable,
  Thumbnail,
  Text,
  Icon,
  InlineStack,
} from '@shopify/polaris';
import { AlertDiamondIcon, ImageIcon } from '@shopify/polaris-icons';
import { truncate } from '~/lib/utils';
import { GeneratedQRCode } from '~/types/qr';

type QRTableProps = {
  qrCodes: GeneratedQRCode[];
};

type QRTableRowProps = {
  qrCode: GeneratedQRCode;
};

export const QRTable: React.FC<QRTableProps> = ({ qrCodes }) => (
  <IndexTable
    resourceName={{
      singular: 'QR code',
      plural: 'QR codes',
    }}
    itemCount={qrCodes.length}
    headings={[
      { title: 'Thumbnail', hidden: true },
      { title: 'Title' },
      { title: 'Product' },
      { title: 'Date created' },
      { title: 'Scans' },
    ]}
    selectable={false}
  >
    {qrCodes.map((qrCode) => (
      <QRTableRow key={qrCode.id} qrCode={qrCode} />
    ))}
  </IndexTable>
);

export const QRTableRow: React.FC<QRTableRowProps> = ({ qrCode }) => (
  <IndexTable.Row id={String(qrCode.id)} position={qrCode.id}>
    <IndexTable.Cell>
      <Thumbnail
        source={qrCode.productImage || ImageIcon}
        alt={qrCode.productTitle}
        size='small'
      />
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Link to={`qrcodes/${qrCode.id}`}>{truncate(qrCode.title)}</Link>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {qrCode.productDeleted ? (
        <InlineStack align='start' gap='200'>
          <span style={{ width: '20px' }}>
            <Icon source={AlertDiamondIcon} tone='critical' />
          </span>
          <Text tone='critical' as='span'>
            product has been deleted
          </Text>
        </InlineStack>
      ) : (
        truncate(qrCode.productTitle)
      )}
    </IndexTable.Cell>
    <IndexTable.Cell>
      {new Date(qrCode.createdAt).toDateString()}
    </IndexTable.Cell>
    <IndexTable.Cell>{qrCode.scans}</IndexTable.Cell>
  </IndexTable.Row>
);
