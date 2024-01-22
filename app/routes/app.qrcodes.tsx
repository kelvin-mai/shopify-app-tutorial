import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { Card, Layout, Page } from '@shopify/polaris';
import { QRCode } from '@prisma/client';

import { authenticate } from '~/shopify.server';
import { getQRCodes } from '~/models/qrcode.server';
import { QREmpty } from '~/components/qr/empty-state';
import { QRTable } from '~/components/qr/table';
import { GeneratedQRCode } from '~/types/qr';

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin, session } = await authenticate.admin(request);
  const qrCodes: QRCode[] = await getQRCodes(session.shop, admin);

  return json({
    qrCodes,
  });
}

export default function QRCodesPage() {
  const { qrCodes } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Page>
      <ui-title-bar title='QR codes'>
        <button variant='primary' onClick={() => navigate('/app/qrcodes/new')}>
          Create QR code
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card padding='0'>
            {qrCodes.length === 0 ? (
              <QREmpty onAction={() => navigate('qrcodes/new')} />
            ) : (
              <QRTable qrCodes={qrCodes as GeneratedQRCode[]} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
