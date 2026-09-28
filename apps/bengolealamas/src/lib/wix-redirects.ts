import type { WixRedirectsFile } from '@repo/shared/redirects/wix';
import { findWixRedirect } from '@repo/shared/redirects/wix';
import redirectsFile from '../../../../data/migration/wix-redirects.json';

const file = redirectsFile as WixRedirectsFile;

export function resolveLegacyRedirect(pathname: string) {
  return findWixRedirect(pathname, file);
}
